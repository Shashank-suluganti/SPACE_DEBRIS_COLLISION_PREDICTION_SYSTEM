# Space Debris Collision Prediction System 🚀

A Physics-Aware Machine Learning based web application for predicting collision risks between satellites and space debris.

---

# 📌 Project Overview

Space debris is one of the major threats to active satellites and spacecraft. Even small debris objects traveling at extremely high velocities can cause catastrophic damage.

This project predicts collision risk using:

- Physics-inspired calculations
- Random Forest Regression
- Flask Backend APIs
- Interactive Web Dashboard

The system allows users to:

✅ Enter collision parameters manually  
✅ Upload CSV datasets  
✅ Predict collision risk  
✅ Visualize orbital movement and risk trends  

---

# 🎯 Features

- 🌍 Interactive frontend dashboard
- 🤖 Random Forest ML prediction model
- ⚡ Flask REST API backend
- 📊 Dynamic risk visualization graph
- 🛰️ Orbital animation system
- 📁 CSV dataset upload support
- 📈 Risk level classification (LOW / MEDIUM / HIGH)

---

# 🧠 Physics-Based USP

Unlike traditional threshold-only systems, this project combines machine learning with physics-aware calculations.

### Physics Formula Used

Kinetic Energy = 0.5 × m × v²

---

# 🛠️ Tech Stack

## Frontend
- HTML
- CSS
- JavaScript
- Chart.js

## Backend
- Flask
- Flask-CORS

## Machine Learning
- Scikit-learn
- Random Forest Regressor
- Pandas
- NumPy
- Joblib

---

# 🏗️ System Architecture

Frontend (HTML/CSS/JS)
↓
Fetch API Requests
↓
Flask Backend API
↓
Random Forest ML Model
↓
Prediction Response
↓
Frontend Visualization Dashboard

---

# 📂 Project Structure

SPACE_DEBRIS_PREDICTION_SYSTEM/

├── index.html  
├── style.css  
├── script.js  
├── app.py  
├── train_model.py  
├── debris_dataset.csv  
├── model.pkl  
└── README.md  

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-link>
cd SPACE_DEBRIS_PREDICTION_SYSTEM
```

## 2️⃣ Install Required Libraries

```bash
pip install flask flask-cors pandas scikit-learn joblib
```

## 3️⃣ Train the Model

```bash
python train_model.py
```

## 4️⃣ Run Flask Backend

```bash
python app.py
```

## 5️⃣ Open Frontend

Open index.html in browser using Live Server.

---

# 🤖 Machine Learning Model

### Algorithm Used
Random Forest Regressor

### Why Random Forest?
- Handles nonlinear relationships
- Better prediction stability
- Reduces overfitting
- Works well on tabular datasets

---

# 🔌 API Endpoint

## POST `/predict`

### Request

```json
{
  "distance": 50,
  "velocity": 8,
  "mass": 400
}
```

### Response

```json
{
  "risk": 0.82,
  "level": "HIGH"
}
```

---

# 📈 Future Enhancements

- Real satellite datasets
- Live satellite tracking APIs
- Deep learning integration
- Real-time orbital trajectory prediction
- Cloud deployment
- 3D visualization

---

# 📚 References

- NASA Orbital Debris Program
- ESA Space Debris Office
- Scikit-learn Documentation
- Flask Documentation

---

# ⭐ License

This project is for educational and research purposes.
