from fastapi import APIRouter,UploadFile, HTTPException, Depends, File
from sqlmodel import Session
from database import get_session
import pdfplumber,docx, io
import crud,schemas, models
from utils.resume_analyzer import match_score

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

@router.post("/match/{job_id}", response_model=schemas.MatchRead)
def analyze_resume(job_id: int, resume_id: int, session: Session = Depends(get_session)):
    job = session.get(models.Job, job_id)
    resume = session.get(models.ResumeRecord, resume_id)
    if not job or not resume:
        raise HTTPException(404, "Job or Resume not found")

    score, missing = match_score(resume.text, job.jd_text)
    match = crud.create_match(
        session,
        models.Match(job_id=job.id, resume_id=resume.id,
                     score=score, missing_keywords=",".join(missing))
    )
    return schemas.MatchRead(
        **match.dict(),
        missing_keywords=missing  
    )