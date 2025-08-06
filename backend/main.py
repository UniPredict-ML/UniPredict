from fastapi import FastAPI
from api.routers import routers

app = FastAPI()

app.include_router(routers.router)
