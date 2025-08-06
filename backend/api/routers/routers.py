from api.models.zscore import AccessibleDegrees
from api.services.predict_zscore import get_top_5_accessible_degrees
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/recommend/", tags=["/recommend"])
async def recommend(data: AccessibleDegrees):
    predicted = get_top_5_accessible_degrees(data)
    return JSONResponse(content={"recommend": predicted})