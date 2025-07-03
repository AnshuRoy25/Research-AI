from pymongo import MongoClient
from Services.get_embeddings import get_embedding
from Services.pdf_to_text import extract_fulltext_from_pdf
from Services.adding_pdfs import get_all_pdfs
from Services.upload_to_ipfs import get_hash

mongo_client = MongoClient("mongodb+srv://anshuroy25:anshumdbroy53160306@jarvis-db-serve.vhsdorp.mongodb.net/?retryWrites=true&w=majority&appName=jarvis-db-serve")
db = mongo_client["research_ai_database"]
collection = db["pdfs"]

research_papers = []

# import all the pdfs
pdfs_list = get_all_pdfs("ADMIN\\PDFS")

# upload all the pdfs to ipfs and get hash for each pdf in return
for pdf_path in pdfs_list:
    # upload to ipfs and get hash
    ipfs_hash = get_hash(pdf_path)
    if ipfs_hash is not None:
        # extract the full text from the pdfs
        full_text = extract_fulltext_from_pdf(pdf_path)
        
        # create paper object with both text and ipfs hash
        paper = {
            "text": full_text,
            "ipfs": ipfs_hash
        }
        
        research_papers.append(paper)

# add embeddings to each paper
for paper in research_papers:
    vector_text = f"{paper['text']}"
    vector_embedding = get_embedding(vector_text)
    paper['embedding'] = vector_embedding
    
    # insert into database
    collection.insert_one(paper)