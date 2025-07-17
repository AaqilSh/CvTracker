from fastapi import APIRouter,UploadFile, HTTPException
import pdfplumber,docx, io
router = APIRouter(prefix="/resume", tags=["Resume"])

def _extract_text(file: UploadFile) -> str:
    if file.filename.endswith(".pdf"):
        with pdfplumber.open(file.file) as pdf:
            return "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())
    elif file.filename.endswith((".docx", ".doc")):
        doc = docx.Document(io.BytesIO(file.file.read()))
        return "\n".join(p.text for p in doc.paragraphs)
    else:
        raise HTTPException(400, "Unsupported file type")