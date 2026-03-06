# backend/main.py
# uvicorn main:app --reload
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from database import users_collection, purchases_collection, recommendations_collection, activity_logs_collection
import jwt
import os
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows your Vite frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class UserAuth(BaseModel):
    username: str
    password: str

class PurchaseRequest(BaseModel):
    username: str
    product_id: int
    payment_token: str

# --- Endpoints ---
@app.post("/signup")
def signup(user: UserAuth):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User exists")
    hashed_pw = pwd_context.hash(user.password)
    users_collection.insert_one({"username": user.username, "password": hashed_pw})
    return {"message": "User created successfully"}

@app.post("/login")
def login(user: UserAuth):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user or not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = jwt.encode({"username": user.username}, SECRET_KEY, algorithm="HS256")
    return {"token": token, "username": user.username}

@app.post("/checkout")
def checkout(req: PurchaseRequest):
    if req.payment_token != "tok_visa":
        raise HTTPException(status_code=400, detail="Payment failed")
    
    # 1. Record purchase
    purchases_collection.insert_one({"username": req.username, "product_id": req.product_id})
    
    # 2. Fetch pre-computed recommendations
    recs_cursor = recommendations_collection.find({"username": req.username}, {"_id": 0, "product_id": 1, "rating": 1})
    recs_list = list(recs_cursor)
    
    # 3. Fallback if no recs found (Using valid IDs 102 and 104)
    recommended_items = recs_list if recs_list else [{"product_id": 102, "rating": 4.8}, {"product_id": 104, "rating": 4.5}]
    
    # --- LOGGING SYSTEM ---
    # Print beautifully to the terminal for the demo
    print("\n" + "="*50)
    print(f"🛍️  NEW PURCHASE: User '{req.username}' bought Product ID: {req.product_id}")
    print(f"✨ SUGGESTIONS SERVED: {recommended_items}")
    print("="*50 + "\n")
    
    # Save the log permanently to MongoDB
    activity_logs_collection.insert_one({
        "username": req.username,
        "action": "purchase",
        "purchased_product_id": req.product_id,
        "recommendations_shown": recommended_items,
        "timestamp": datetime.utcnow()
    })
    # ----------------------
    
    return {"status": "success", "recommendations": recommended_items}

@app.get("/recommendations/{username}")
def get_user_recommendations(username: str):
    # Query MongoDB for the pre-computed recs from Databricks
    recs = list(recommendations_collection.find({"username": username}))
    
    # If no recs yet (new user), return a default set
    if not recs:
        return {"recommendations": [
            {"product_id": 101, "rating": 5.0}, 
            {"product_id": 102, "rating": 4.5}
        ]}
    
    # Format for frontend
    for r in recs: r.pop("_id", None)
    return {"recommendations": recs}