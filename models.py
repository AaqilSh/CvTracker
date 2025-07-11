from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    company: str
    status: str = "Applied"           
    jd_text: str                      
    created_at: datetime = Field(default_factory=datetime.timezone.utc)


class ResumeRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    text: str                         # extracted plain text
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)