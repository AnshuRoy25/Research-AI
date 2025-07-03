from pymongo import MongoClient
from services.embedding_service import get_embedding
from openai import OpenAI
from models.database import pdf_collection
from models.database import ai_client
import os


def get_response(query):
    
          query_embeddings = get_embedding(query)

          pipeline = [
            {
              "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": query_embeddings,
                "numCandidates": 100,
                "limit": 1
              }
            }
          ]

          similar_paper = list(pdf_collection.aggregate(pipeline))

          paper_texts = similar_paper[0]["text"]
          ipfs = similar_paper[0]["ipfs"]

        
    
          # Create prompt for AI model
          prompt = [
              {
                  "role": "system",
                  "content": "You are a research assistant. Answer questions only using the provided research papers. If the answer is not in the papers, respond with: 'I cannot answer this question as it is out of my scope'"
              },
              {
                  "role": "user", 
                  "content": f"Research Papers: {paper_texts}\n\nQuestion: {query}"
              }
          ]

          # Generate response using AI model
          response = ai_client.chat.completions.create(
              model="mistralai/mistral-7b-instruct:free",
              messages=prompt
          )

          # Print the answer
          reply = response.choices[0].message.content

          return {"reply": reply, "ipfs": ipfs}


