from pydantic import BaseModel

class PredictZScoreInput(BaseModel):
    district: str
    stream: str
    degree: str

class AccessibleDegrees(BaseModel):
    user_z_score: float
    stream: str
    district: str

