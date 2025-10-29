from pydantic_settings import BaseSettings
from typing import Literal

class Settings(BaseSettings):
    ENV: Literal["dev","prod"] = "dev"
    API_PREFIX: str = "/api/v1"
    DB_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
