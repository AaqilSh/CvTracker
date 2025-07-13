from pydantic import BaseModel
from datetime import datetime
from typing import List

class JobCreate(BaseModel):
    title: str
    company: str
    status: str = "Applied"
    jd_text: str

class JobRead(JobCreate):
    id: int
    created_at: datetime
    
class ResumeUpload(BaseModel):
    filename: str
    text: str
    
class ResumeRead(ResumeUpload):
    id: int
    uploaded_at: datetime
    
class MatchRead(BaseModel):
    id: int
    job_id: int
    resume_id: int
    score: float
    missing_keywords: List[str]
    created_at: datetime