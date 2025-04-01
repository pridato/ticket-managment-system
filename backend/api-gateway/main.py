from fastapi import FastAPI
import httpx
import uvicorn
import logging

# Configuración del logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI()

# Microservicios configurados
MICROSERVICES = {
    "tickets": "http://localhost:8000",
    "auth": "http://localhost:8001",
    "notification": "http://localhost:8002",
}

async def forward_request(service: str, path: str):
    """
    Reenvía una solicitud GET al microservicio especificado.

    Args:
        service (str): El nombre del microservicio al que se enviará la solicitud.
        path (str): La ruta del endpoint dentro del microservicio.

    Returns:
        dict: La respuesta JSON del microservicio.
    """
    url = f"{MICROSERVICES[service]}/{path}"
    logger.info(f"Reenviando solicitud a {url}")
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()


@app.get("/{service}/{path:path}")
async def gateway(service: str, path: str):
    """
    Gateway para reenviar solicitudes a microservicios.

    Args:
        service (str): El nombre del microservicio al que se enviará la solicitud.
        path (str): La ruta del endpoint dentro del microservicio.

    Returns:
        dict: La respuesta del microservicio.
    """
    logger.info(f"Reenviando solicitud a {service}/{path}")
    if service not in MICROSERVICES:
        logger.error(f"Microservicio {service} no encontrado")
        return {"error": "Microservicio no encontrado"}
    return await forward_request(service, path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)