"""
resume_parser.py
----------------
Extracts raw text from uploaded PDF resumes.
Uses pdfplumber as primary, falls back to PyPDF2.
"""

import io
from typing import Optional


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract all text from a PDF given raw bytes.
    Returns the extracted text as a single string.
    """
    text = ""

    # --- Attempt 1: pdfplumber (best for tabular/structured PDFs) ---
    try:
        import pdfplumber
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        if text.strip():
            return text.strip()
    except Exception as e:
        print(f"[pdfplumber] Failed: {e}")

    # --- Attempt 2: PyPDF2 fallback ---
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        if text.strip():
            return text.strip()
    except Exception as e:
        print(f"[PyPDF2] Failed: {e}")

    # --- Final fallback: return empty string ---
    return text.strip()
