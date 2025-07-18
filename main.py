from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import jobs, resume

app = FastAPI(title="Career Companion API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router)
app.include_router(resume.router)

init_db()   


@app.get("/")
def read_root():
    return {"msg": "Career Companion backend running"}