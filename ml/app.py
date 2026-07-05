from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

models = joblib.load(MODEL_PATH)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_data = np.array([[ 
        data["temp"],
        data["humidity"],
        data["pressure"],
        data["wind"],
        data["rainfall_mm"]
    ]])

    result = {}

    for key in models:
        prob = models[key].predict_proba(input_data)[0][1]
        result[key] = round(prob * 100, 2)

    return jsonify(result)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)