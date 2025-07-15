from fastapi import APIRouter, Depends
from crud import crud
from schemas import schemas
from database import get_session
from sqlmodel import Session
from models import models
router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/", response_model=schemas.JobRead)
def add_job(job: schemas.JobCreate, session: Session = Depends(get_session)):
    db_job = crud.create_job(session, models.Job(**job.dict()))
    return db_job