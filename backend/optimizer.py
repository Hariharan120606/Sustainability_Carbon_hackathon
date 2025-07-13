# backend/optimizer.py
import sys
import json
import requests
import random
import os
from dotenv import load_dotenv

# Load .env (adjust path if needed)
load_dotenv(dotenv_path="./.env")

GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")


if not GOOGLE_API_KEY:
    raise Exception("Missing GOOGLE_API_KEY in .env")

start = sys.argv[1]
end = sys.argv[2]

def get_route_info(start, end):
    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={start}&destination={end}&key={GOOGLE_API_KEY}"
    response = requests.get(url).json()
    if response.get("status") != "OK":
        raise Exception(response.get("error_message", "Google Maps error"))
    leg = response["routes"][0]["legs"][0]
    return {
        "distance": round(leg["distance"]["value"] / 1000, 2),
        "duration": round(leg["duration"]["value"] / 60, 2),
        "route": [step["html_instructions"] for step in leg["steps"]]
    }

def get_weather_score(location):
    return 1.0  # Placeholder — can use OPENWEATHER_API_KEY

def estimate_demand(location):
    return random.uniform(0.8, 1.3)

try:
    route = get_route_info(start, end)
    route["duration"] *= get_weather_score(end) * estimate_demand(end)
    route["duration"] = round(route["duration"], 2)

    base = route["distance"] * 0.27
    optimized = route["distance"] * 0.18
    route["co2_saved"] = round(base - optimized, 2)

    print(json.dumps(route))
except Exception as e:
    print(json.dumps({"error": str(e)}))
