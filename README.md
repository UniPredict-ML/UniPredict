# UniPredict

## Contributors
- 22ug1-0480 H.A.L.Ruwanya
- 22ug1-0487 P.M.V.M.Didulani
- 22ug1-0134 W.A.D.R. Weerasinghe
- 22ug1-0093 M.C.R Mallawaarachchi
- 22ug1-0238 R.K.N.R. Ranasinghe
- 22ug1-0499 W.D.S. De mel
- 22ug1-0849 S.M.A.Nisansala 
- 22ug1-0530 S.G.T.A.Anusarani
- 22ug1-0559 K.K.R.Shehara

## Overview

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

# Backend Module
##  `/recommend/` – Predict Top 5 Accessible Degrees

###  Description

This POST endpoint accepts a student's Z-score, stream, and district, then returns the top 5 university degree programs that the student is most likely to gain admission to.


## Tech Stack
- **Framewrk**: FastAPI


### DOCS URL
GET /docs/

### URL
POST /recommend/


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
## Folder Structure

```
backend
┃   api
┃    ┣ models
┃    ┃ ┣ __init__.py
┃    ┃ ┗ zscore.py
┃    ┣ routers
┃    ┃ ┣ __init__.py
┃    ┃ ┗ routers.py
┃    ┣ services
┃    ┃ ┣ model
┃    ┃ ┃ ┗ model.joblib
┃    ┃ ┣ processed_datasets
┃    ┃ ┃ ┣ final_dataset.csv
┃    ┃ ┃ ┗ final_dataset_engineered_encoded.csv
┃    ┃ ┣ __init__.py
┃    ┃ ┣ final_dataset.csv
┃    ┃ ┣ final_dataset_engineered_encoded.csv
┃    ┃ ┗ predict_zscore.py
┃    ┗ test
┣----main.py
┣----pyproject.toml
┗----README.md
  ```

## Backend Setup & Installation (using uv)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **(Optional) Create and activate a Python virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies with uv:**
   ```bash
   uv pip install -r pyproject.toml
   ```
   *Or, to sync all dependencies:*
   ```bash
   uv sync
   ```

4. **Start the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```

5. **Access the API documentation:**
   Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.



  # Frontend Module  
  ## Overview
The UniPredict frontend is a React-based web application that allows students to predict university admission Z-score cutoffs and receive personalized degree recommendations. It connects to the backend API and presents results in a user-friendly dashboard. 

## Tech Stack
- **Framework:** React 
- **Styling:** Bootstrap
- **API:** Connects to FastAPI backend

## Folder Structure
```
frontend/
├── public/                
├── src/
│   ├── components/        
│   ├── App.js             
│   ├── index.js           
│   ├── index.css                          
├── package.json           
└── README.md              
```

## Setup & Installation

1. **INavigate to the backend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.
