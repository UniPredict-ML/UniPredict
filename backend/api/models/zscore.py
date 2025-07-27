from pydantic import BaseModel

class ZScoreInput(BaseModel):
    year: int
    district: str
    programme: str
    stream: str
    number: int
    passed: int
