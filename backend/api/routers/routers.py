from api.models.zscore import AccessibleDegrees
from api.services.predict_zscore import get_top_5_accessible_degrees
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/predict_zscore/", tags=["predict_zscore"])
async def predict_zscore(data: AccessibleDegrees):
    predicted = get_top_5_accessible_degrees(data)
    return JSONResponse(content={"predicted_z_score": predicted})