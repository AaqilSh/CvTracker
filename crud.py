from sqlmodel import Session, select
from models import Job

def create_job(session: Session, job: Job) -> Job:
    session.add(job)
    session.commit()
    session.refresh(job)
    return job

def list_jobs(session: Session):
    return session.exec(select(Job)).all()