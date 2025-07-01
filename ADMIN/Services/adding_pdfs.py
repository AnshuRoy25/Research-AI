import os

def get_all_pdfs(folder_path):
    pdf_files = []

    for file in os.listdir(folder_path):
        if file.lower().endswith(".pdf"):
            full_path = os.path.join(folder_path, file)
            pdf_files.append(full_path)

    return pdf_files
