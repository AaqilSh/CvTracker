from sqlmodel import Session, select
from models import Job, ResumeRecord, Match

def create_job(session: Session, job: Job) -> Job:
    session.add(job)
    session.commit()
    session.refresh(job)
    return job

def list_jobs(session: Session):
    return session.exec(select(Job)).all()

def create_resume(session: Session, resume: ResumeRecord) -> ResumeRecord:
    session.add(resume)
    session.commit()
    session.refresh(resume)
    return resume

def create_match(session: Session, match: Match) -> Match:
    session.add(match)
    session.commit()
    session.refresh(match)
    return match