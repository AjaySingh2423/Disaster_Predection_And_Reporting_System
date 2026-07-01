import pandas as pd
import numpy as np

np.random.seed(42)

rows = 200

data = pd.DataFrame({
    "temp": np.round(np.random.uniform(20, 40, rows), 2),
    "humidity": np.round(np.random.uniform(50, 100, rows), 2),
    "pressure": np.round(np.random.uniform(990, 1025, rows), 2),
    "wind": np.round(np.random.uniform(0, 20, rows), 2),
    "rainfall_mm": np.round(np.random.uniform(0, 250, rows), 2),
})

data["heavy_rain"] = (data["rainfall_mm"] > 100).astype(int)
data["flood"] = ((data["rainfall_mm"] > 150) & (data["humidity"] > 85)).astype(int)
data["cloudburst"] = ((data["rainfall_mm"] > 200) & (data["wind"] > 10)).astype(int)

data.to_csv("disaster_dataset_200.csv", index=False)

print("Dataset created")