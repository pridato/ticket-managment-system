from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "")

# Creamos motor de base de datos, sesiones y base de datos para controlar con SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT 1"))
        print("✅ Conexión a la base de datos exitosa")
    except Exception as e:
        print(f"❌ Error en la conexión a la base de datos: {e}")
    finally:
        db.close()


get_db()
