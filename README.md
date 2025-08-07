# UniPredict

## Overview
[Your main project overview]

## Project Structure
- **backend/** - Backend API and services
- **frontend/** - User interface
- **ml/** - Machine Learning module
- **data/** - Data files
- **infra/** - Infrastructure configuration

## Machine Learning Module


## Overview
The ML module predicts university admission Z-score cutoffs using LightGBM regression and provides personalized degree recommendations based on historical data from Sri Lankan universities.

## Features
- **Z-Score Prediction**: Predicts admission cutoffs for specific degree programs
- **Smart Recommendations**: Finds top 5 accessible degrees based on user's Z-score
- **Multi-Stream Support**: Handles biological science, physical science, commerce, arts, technology streams
- **District Analysis**: Considers geographical variations in admission patterns
- **Input Validation**: Comprehensive validation with fuzzy matching

## Folder Structure
```
ml/
├── cops/                    # Z-score cutoff data by year
├── model/                   # Trained LightGBM model (model.joblib)
├── perfs/                   # Student performance data by stream/year
├── processed_datasets/      # Cleaned and feature-engineered datasets
├── streams/                 # Degree-to-stream mapping data
├── predict.py              # Main prediction and recommendation functions
└── explore.ipynb           # Data analysis notebook
```

## How to Run
1. **Install dependencies**: `uv sync` or `pip install pandas lightgbm scikit-learn joblib`
2. **Process data & train model**: Run the data processing pipeline
3. **Make predictions**: `python predict.py`
4. **Explore data**: Open `explore.ipynb` in Jupyter

## Main Functions
- `predict(degree, stream, district)` - Predicts Z-score cutoff for specific degree
- `get_top_5_accessible_degrees(user_z_score, stream, district)` - Returns ranked accessible degrees

## Tech Stack
- **Algorithm**: LightGBM Regressor
- **Libraries**: pandas, lightgbm, scikit-learn, joblib
- **Features**: District, Stream, Degree, Time Index, Pass Rate
- **Validation**: Time-based splitting with MAE and R² metrics

## Backend Module
##  `/recommend/` – Predict Top 5 Accessible Degrees

###  Description

This POST endpoint accepts a student's Z-score, stream, and district, then returns the top 5 university degree programs that the student is most likely to gain admission to.

---
## Tech Stack
- **Framewrk**: FastAPI
---

### DOCS URL
GET /docs/

### URL
POST /recommend/


---

### Request Body (JSON)

Must follow the `AccessibleDegrees` model format:

```json
{
  "user_z_score": 1.5,
  "stream": "Physical Science",
  "district": "Colombo"
} 
```

### Request Body (JSON) 
A list of up to 5 degree programs with predicted cutoff scores:

```
{
  "recommend": [
    {
      "degree": "ENGINEERING UNIVERSITY OF PERADENIYA",
      "predicted_cutoff": 1.2125417169917154,
      "margin": 0.2874582830082846
    },
    {
      "degree": "ENGINEERING UNIVERSITY OF SRI JAYEWARDENEPURA",
      "predicted_cutoff": 1.2125417169917154,
      "margin": 0.2874582830082846
    },
    {
      "degree": "ENGINEERING UNIVERSITY OF RUHUNA",
      "predicted_cutoff": 1.2125417169917154,
      "margin": 0.2874582830082846
    },
    {
      "degree": "ENGINEERING UNIVERSITY OF MORATUWA",
      "predicted_cutoff": 1.2125417169917154,
      "margin": 0.2874582830082846
    },
    {
      "degree": "COMPUTER SCIENCE UNIVERSITY OF KELANIYA",
      "predicted_cutoff": 1.2125417169917154,
      "margin": 0.2874582830082846
    }
  ]
}
```


## Frontend Module  
[Frontend documentation]