<div align="center">

# UniPredict
*A Machine Learning-Based University Degree Recommendation System*

</div>

> [!NOTE]
> This repository contains the complete source code for **UniPredict**, a tool designed to forecast university admission Z-score cutoffs and provide personalized degree recommendations.

## Project Structure

- **`backend/`**: Houses the backend API and related services.
- **`frontend/`**: Contains the user interface and all frontend logic.
- **`ml/`**: Includes the Machine Learning module for model training and predictions.
- **`data/`**: Stores data files used across the project.
- **`infra/`**: Holds infrastructure configurations.

---

## Machine Learning Module

### Overview

The ML module is the core of UniPredict, leveraging a **LightGBM regression model** to predict university admission Z-score cutoffs. It provides students with personalized degree recommendations based on historical data from Sri Lankan universities.

### Key Features

- **Z-Score Prediction**: Forecasts admission cutoffs for specific degree programs.
- **Smart Recommendations**: Identifies the top 5 most accessible degrees based on a user's Z-score.
- **Multi-Stream Support**: Accommodates various academic streams, including Biological Science, Physical Science, Commerce, Arts, and Technology.
- **District-Level Analysis**: Accounts for geographical differences in admission patterns.
- **Robust Input Validation**: Ensures data integrity through comprehensive validation, including fuzzy matching for user inputs.

### Folder Structure

```
ml/
├── cops/                    # Z-score cutoff data, organized by year
├── model/                   # Trained LightGBM model (model.joblib)
├── perfs/                   # Student performance data, categorized by stream and year
├── processed_datasets/      # Cleaned and feature-engineered datasets
├── streams/                 # Data mapping degrees to academic streams
├── predict.py               # Core prediction and recommendation logic
└── explore.ipynb            # Jupyter Notebook for data analysis and exploration
```

### How to Run

1. **Install Dependencies**:
   ```bash
   uv sync
   ```
   Alternatively, you can install packages individually:
   ```bash
   pip install pandas lightgbm scikit-learn joblib
   ```

2. **Process Data & Train Model**:
   Execute the data processing pipeline to prepare the datasets and train the model.

3. **Make Predictions**:
   ```bash
   python predict.py
   ```

4. **Explore Data**:
   Launch Jupyter and open `explore.ipynb` to delve into the data analysis process.

### Core Functions

- `predict(degree, stream, district)`: Predicts the Z-score cutoff for a specified degree.
- `get_top_5_accessible_degrees(user_z_score, stream, district)`: Returns a ranked list of the most accessible degrees for a user.

### Tech Stack

- **Algorithm**: LightGBM Regressor
- **Libraries**: pandas, lightgbm, scikit-learn, joblib
- **Key Features**: District, Stream, Degree, Time Index, Pass Rate
- **Validation**: Time-based splitting with MAE and R² metrics for model evaluation.

---

## Backend Module

### API Endpoint: `/recommend/`

This `POST` endpoint is designed to provide the top 5 most accessible university degree programs based on a student's Z-score, academic stream, and district.

### Tech Stack

- **Framework**: FastAPI

### API Documentation

The interactive API documentation is available at:
`GET /docs/`

### Endpoint URL

`POST /recommend/`

> [!WARNING]
> The request body must adhere to the `AccessibleDegrees` model format.

### Request Body (JSON)

```json
{
  "user_z_score": 1.5,
  "stream": "Physical Science",
  "district": "Colombo"
}
```

### Example Response (JSON)

A list of up to 5 degree programs with their predicted cutoff scores:

```json
{
  "recommend": [
    {
      "degree": "ENGINEERING UNIVERSITY OF PERADENIYA",
      "predicted_cutoff": 1.2125,
      "margin": 0.2875
    },
    {
      "degree": "ENGINEERING UNIVERSITY OF SRI JAYEWARDENEPURA",
      "predicted_cutoff": 1.2125,
      "margin": 0.2875
    },
    // ... other recommendations
  ]
}
```

### Folder Structure

```
backend/
├── api/
│   ├── models/
│   ├── routers/
│   └── services/
├── main.py
├── pyproject.toml
└── README.md
```

### Backend Setup & Installation (using `uv`)

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Create and Activate a Virtual Environment** (Recommended):
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   uv pip install -r requirements.txt
   ```
   Or, to sync all dependencies from `uv.lock`:
   ```bash
   uv sync
   ```

4. **Start the FastAPI Server**:
   ```bash
   uvicorn main:app --reload
   ```

5. **Access API Documentation**:
   Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

---

## Frontend Module

### Overview

The UniPredict frontend is a **React-based web application** that provides a user-friendly interface for students to interact with the prediction model. It connects to the backend API and displays the results in a clear and intuitive dashboard.

### Tech Stack

- **Framework**: React
- **Styling**: Bootstrap
- **API Communication**: Connects to the FastAPI backend.

### Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### Setup & Installation

1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.