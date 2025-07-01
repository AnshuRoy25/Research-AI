import requests
import os
from dotenv import load_dotenv

load_dotenv()

HF_API_TOKEN = os.getenv("HF_API_KEY")

API_URL = "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction"

HEADERS = {"Authorization": f"Bearer {HF_API_TOKEN}"}


def get_embedding(text):
    response = requests.post(
        API_URL,
        headers=HEADERS,
        json={"inputs": text}
    )
    response.raise_for_status()
    embedding = response.json()
    return embedding

