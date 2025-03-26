import os
import redis
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "")

# Conexión a Redis
r = redis.Redis.from_url(REDIS_URL)

# Probamos si la conexión es exitosa
try:
    if not r:
        raise Exception("No se pudo conectar a Redis")
    response = r.ping()
    print("Conexión a Redis exitosa:", response)
except redis.ConnectionError as e:
    print("Error de conexión a Redis:", e)
