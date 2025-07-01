import fitz  # PyMuPDF
import pytesseract
from pdf2image import convert_from_path

def extract_fulltext_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    all_text = []

    for page_num in range(len(doc)):
        page = doc[page_num]

        # Try regular text extraction
        text = page.get_text()

        if not text.strip():  # Fallback if scanned image
            

            # Use pdf2image to convert that page to image
            images = convert_from_path(pdf_path, dpi=300, first_page=page_num+1, last_page=page_num+1)
            img = images[0]

            # Optional: Preprocessing for OCR
            img = img.convert("L")  # Grayscale
            img = img.resize((img.width * 2, img.height * 2))

            # OCR with Tesseract
            text = pytesseract.image_to_string(img)

        all_text.append(f"Page {page_num + 1}:\n{text}\n")

    doc.close()
    return "\n".join(all_text)


