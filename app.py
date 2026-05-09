from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import io

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    distance = float(data['distance'])
    velocity = float(data['velocity'])
    mass = float(data['mass'])

    # ML Prediction
    prediction = float(model.predict([[distance, velocity, mass]])[0])

    # Convert to readable level
    if prediction > 0.7:
        level = "HIGH"
    elif prediction > 0.4:
        level = "MEDIUM"
    else:
        level = "LOW"

    return jsonify({
        "risk": round(prediction, 3),
        "level": level
    })

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        try:
            df = pd.read_csv(file)
            required_cols = ['distance', 'velocity', 'mass']
            if not all(col in df.columns for col in required_cols):
                return jsonify({"error": "Missing required columns in CSV"}), 400
            
            predictions = model.predict(df[required_cols])
            
            results = []
            for i, pred in enumerate(predictions):
                row = df.iloc[i]
                pred_val = float(pred)
                if pred_val > 0.7:
                    level = "HIGH"
                elif pred_val > 0.4:
                    level = "MEDIUM"
                else:
                    level = "LOW"
                    
                results.append({
                    "distance": float(row['distance']),
                    "velocity": float(row['velocity']),
                    "mass": float(row['mass']),
                    "risk": round(pred_val, 3),
                    "level": level
                })
                
            return jsonify({"results": results})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)