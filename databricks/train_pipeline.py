import os
from dotenv import load_dotenv
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.ml.feature import StringIndexer

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "hackathon_db"
COLLECTION_NAME = "recommendations"

# Initialize Spark Session (Required for local venv execution)
# Note: To write to Mongo, you need the Mongo-Spark connector package
spark = SparkSession.builder \
    .appName("RecSys") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
    .getOrCreate()

# 1. Dummy Interaction Data
# Create interactions based on the Personas
data = [
    # Persona 1: Apple Fans (Buy Mac, iPad, Apple Watch, AirPods)
    ("apple_user1", 111, 5.0), ("apple_user1", 113, 5.0), ("apple_user1", 102, 4.0), ("apple_user1", 104, 5.0),
    ("apple_user2", 111, 4.0), ("apple_user2", 146, 5.0), ("apple_user2", 168, 5.0),
    
    # Persona 2: Gamers (Buy Razer, Zephyrus, High Hz Monitors, RGB Peripherals)
    ("gamer_user1", 142, 5.0), ("gamer_user1", 115, 5.0), ("gamer_user1", 110, 4.0), ("gamer_user1", 153, 5.0),
    ("gamer_user2", 151, 4.0), ("gamer_user2", 107, 5.0), ("gamer_user2", 159, 4.0),
    
    # Persona 3: Creators (Buy Cameras, Mics, Stream Decks)
    ("creator_user1", 122, 5.0), ("creator_user1", 150, 4.0), ("creator_user1", 120, 5.0),
    ("creator_user2", 154, 5.0), ("creator_user2", 145, 5.0), ("creator_user2", 101, 4.0),
    
    # Persona 4: Smart Home (Buy Echo, Hue, Vacuums)
    ("smarthome_user1", 123, 5.0), ("smarthome_user1", 130, 5.0), ("smarthome_user1", 155, 4.0),
    ("smarthome_user2", 138, 4.0), ("smarthome_user2", 147, 5.0), ("smarthome_user2", 164, 5.0),

    # --- THE TEST SUBJECT ---
    # We pretend a new user logged in and bought an Apple Watch and a MagSafe stand.
    # Because of Collaborative Filtering, the model WILL recommend a MacBook or AirPods.
    ("new_test_user", 102, 5.0), ("new_test_user", 168, 4.0)
]
df = spark.createDataFrame(data, ["username", "product_id", "rating"])

# Convert string usernames to numeric IDs for ALS
indexer = StringIndexer(inputCol="username", outputCol="user_id")
df_numeric = indexer.fit(df).transform(df)

# 2. Train ALS Model
als = ALS(maxIter=5, regParam=0.01, userCol="user_id", itemCol="product_id", ratingCol="rating", coldStartStrategy="drop")
model = als.fit(df_numeric)

# 3. Generate Recommendations
user_recs = model.recommendForAllUsers(5)

# 4. Save to MongoDB 
user_recs.write.format("mongo") \
    .mode("overwrite") \
    .option("uri", MONGO_URI) \
    .option("database", DB_NAME) \
    .option("collection", COLLECTION_NAME) \
    .save()

print(f"Recommendations pushed to MongoDB -> {DB_NAME}.{COLLECTION_NAME}!")