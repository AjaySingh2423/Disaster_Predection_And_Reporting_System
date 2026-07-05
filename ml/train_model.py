import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "disaster_dataset_200.csv")

df = pd.read_csv(DATA_PATH)

# Features
X = df[["temp", "humidity", "pressure", "wind", "rainfall_mm"]]

# Targets
targets = ["flood", "cloudburst", "heavy_rain"]

models = {}

for target in targets:
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    print(f"{target} accuracy:", acc)

    models[target] = model

# Save model
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

joblib.dump(models, MODEL_PATH)

print("Model trained and saved")