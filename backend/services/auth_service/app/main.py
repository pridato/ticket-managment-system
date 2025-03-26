from fastapi import FastAPI
from services.auth_service.api.auth_route import router as auth_router
app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
