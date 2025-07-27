from api.models.zscore import ZScoreInput
from api.services.predict_zscore import get_predicted_zscore
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/predict_zscore/", tags=["predict_zscore"])
async def predict_zscore(data: ZScoreInput):
    predicted = get_predicted_zscore(data)
    return JSONResponse(content={"predicted_z_score": predicted})