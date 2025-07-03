
from lighthouseweb3 import Lighthouse
import os
from dotenv import load_dotenv

load_dotenv()

def get_hash(pdf_path):

    # Initialize the Lighthouse object with your API key
    API_KEY = os.getenv("LIGHTHOUSE_API_KEY")
    lighthouse = Lighthouse(API_KEY)

    uploads = lighthouse.getUploads()

    for file in uploads["fileList"]:
        if pdf_path == file['fileName']:
            return None
        

    # Upload the file
    response = lighthouse.upload(pdf_path)

    # Extract the CID (hash)
    hash = response['data']['Hash']

    return hash
