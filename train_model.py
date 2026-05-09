import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

print("Loading dataset...")

# Load dataset
df = pd.read_csv("data.csv")

print("Dataset loaded:")
print(df.head())

# Features
X = df[['distance', 'velocity', 'mass']]

# Target
y = df['risk']

print("Training model...")

model = RandomForestRegressor(n_estimators=100)
model.fit(X, y)

print("Saving model...")

joblib.dump(model, "model.pkl")

print("Model saved successfully!")
















