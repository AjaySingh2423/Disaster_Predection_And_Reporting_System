import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("../data/disaster_dataset_200.csv")

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
joblib.dump(models, "model.pkl")

print("Model trained and saved")