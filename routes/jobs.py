import crud
import schemas
import models
from fastapi import APIRouter, Depends
from database import get_session
from sqlmodel import Session

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/", response_model=schemas.JobRead)
def add_job(job: schemas.JobCreate, session: Session = Depends(get_session)):
    db_job = crud.create_job(session, models.Job(**job.dict()))
    return db_job

@router.get("/", response_model=list[schemas.JobRead])
def get_jobs(session: Session = Depends(get_session)):
    return crud.list_jobs(session)
