from pydantic import BaseModel

class JobCreate(BaseModel):
    title: str
    company: str
    status: str = "Applied"
    jd_text: str