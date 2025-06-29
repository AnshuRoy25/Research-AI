from openai import OpenAI
from config import Config
from utils.database import get_collections
from services.embedding_service import embedding_service

class AIService:
    def __init__(self):
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=Config.OPENROUTER_API_KEY
        )
    
    def get_response(self, query):
        collections = get_collections()
        pdfs_collection = collections['pdfs']
        
        query_embeddings = embedding_service.get_embedding(query)

        pipeline = [
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embeddings",
                    "queryVector": query_embeddings,
                    "numCandidates": 100,
                    "limit": 1
                }
            }
        ]

        similar_papers = pdfs_collection.aggregate(pipeline)
        
        # Note: You'll need to fix the iteration here as aggregate returns cursor
        paper_data = list(similar_papers)[0] if similar_papers else {}
        paper_texts = paper_data.get("text", "")
        ipfs = paper_data.get("ipfs", "")
        
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
        response = self.client.chat.completions.create(
            model="model_name",  # Replace with actual model name
            messages=prompt
        )

        reply = response.choices[0].message.content
        return {"reply": reply, "ipfs": ipfs}

# Global instance
ai_service = AIService()