from fastapi import FastAPI
from api.ticket import router as ticket_router
from api.comment import router as comment_router
from backend.ddbb.database.db_postgres import engine
from backend.ddbb.database.models.base import Base
from backend.ddbb.database.models.Ticket import Ticket
from backend.ddbb.database.models.Comment import Comment

# Crear las tablas en la base de datos (si no existen)
Base.metadata.create_all(bind=engine)

# Inicializar la aplicación FastAPI
app = FastAPI()

# Incluir las rutas de ticket y comentarios en la aplicación
app.include_router(ticket_router, prefix="/tickets", tags=["tickets"])
app.include_router(comment_router, prefix="/tickets", tags=["comments"])

# Ruta raíz para comprobar que la API está funcionando


@app.get("/")
def read_root():
    return {"message": "Welcome to the Ticket Management System API!"}
