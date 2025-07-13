from sqlmodel import Session
from models import Job

def create_job(session: Session, job: Job) -> Job:
    session.add(job)
    session.commit()
    session.refresh(job)
    return job