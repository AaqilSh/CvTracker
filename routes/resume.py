from fastapi import APIRouter,UploadFile, HTTPException, Depends, File
from sqlmodel import Session
from database import get_session
import pdfplumber,docx, io
from .. import crud, schemas, models

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
    

@router.post("/upload", response_model=schemas.ResumeRead)
def upload_resume(file: UploadFile = File(...), session: Session = Depends(get_session)):
    text = _extract_text(file)
    record = crud.create_resume(session, models.ResumeRecord(filename=file.filename, text=text))
    return record