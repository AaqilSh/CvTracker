from pydantic import BaseModel
from datetime import datetime

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