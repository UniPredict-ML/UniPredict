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
[Backend documentation]

## Frontend Module  
[Frontend documentation]