# backend/database.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.hackathon_db

users_collection = db.users
purchases_collection = db.purchases
recommendations_collection = db.recommendations
products_collection = db.products
# Add this new line for telemetry logging:
activity_logs_collection = db.activity_logs