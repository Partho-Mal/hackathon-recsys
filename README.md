# Hackathon RecSys

A full-stack AI-powered eCommerce recommendation system built for hackathons and rapid prototyping. This project combines a modern React frontend, FastAPI backend, MongoDB database, and Spark ALS recommendation engine to simulate personalized product recommendations after checkout.

## Live Demo

Frontend deployed on Vercel: [https://hackathon-recsys.vercel.app](https://hackathon-recsys.vercel.app)

> Note: Only the frontend is currently deployed. Backend APIs and recommendation services are not live yet.

## Features

### Frontend

* Landing page
* Login and signup pages
* Protected store route using authentication
* Product storefront UI
* Checkout flow
* Responsive React interface

### Backend

* FastAPI REST API
* JWT authentication
* User registration and login
* Purchase logging
* Recommendation endpoints
* MongoDB integration

### AI Recommendation Engine

* Apache Spark ALS collaborative filtering
* Persona-based dummy training data
* Product suggestions after purchase
* MongoDB recommendation storage

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Vercel

### Backend

* FastAPI
* Python
* Passlib
* JWT

### Database

* MongoDB Atlas

### Machine Learning

* PySpark
* ALS Recommendation Model

## Project Structure

```bash
frontend/    # React app
backend/     # FastAPI APIs
databricks/  # Spark recommendation pipeline
```

## Return

This project demonstrates a complete recommendation-based eCommerce architecture:

* **frontend/** -> Modern React application delivering the user interface, authentication flow, storefront, and checkout experience.
* **backend/** -> FastAPI-powered REST APIs handling user accounts, purchases, authentication, and recommendation delivery.
* **databricks/** -> Spark-based machine learning pipeline training an ALS collaborative filtering model for personalized product recommendations.

Together, these components create a scalable full-stack system for intelligent shopping experiences.

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Recommendation Pipeline

```bash
cd databricks
python train_pipeline.py
```

## Current Status

* Frontend deployed
* Backend not deployed yet
* Recommendation APIs local only
* Full integration in progress

## Future Improvements

* Deploy backend on Render, Railway, or Azure
* Real payment gateway integration
* Product catalog with images
* Better recommendation accuracy
* Admin analytics dashboard
* User purchase history
* CI/CD pipeline

