# UniPredict: Z-Score Prediction and Degree Recommendation System

## Overview

This is the machine learning component of UniPredict, a model to predict university recommendations using z-score cutoff prediction to help students find suitable degree programs based on their z-score, chosen stream, and district.

The core of this project is a LightGBM regression model trained on historical data to forecast future Z-score requirements.

## Datasets

The model is trained on a combination of datasets from the following sources:

-   `cops/`: Contains Z-score cutoff data for all public universities from 2018 to 2022.
-   `perfs/`: Contains A/L examination performance statistics (e.g., number of students who sat, number who passed) for each stream and district from 2019 to 2022.
-   `streams/`: Contains a mapping of university degree programs to their corresponding A/L streams.

These raw datasets are cleaned, merged, and feature-engineered, with the final processed datasets stored in the `processed_datasets/` directory.

## Methodology

The data processing and modeling pipeline follows these key steps:

1.  **Data Preprocessing**: Raw CSV files are loaded, cleaned, and standardized. This includes renaming columns, handling inconsistencies, and merging the different data sources into a unified dataset.
2.  **Feature Engineering**: New features are created to improve model performance:
    -   `pass_rate`: The ratio of students who passed to the number of students who sat for the exam in a given stream and district.
    -   `time_index`: A numerical representation of the year to capture time-series trends.
3.  **Encoding**: Categorical features such as `District`, `stream`, and `degree` are one-hot encoded to be used in the model.
4.  **Modeling**: A **LightGBM Regressor** is used to predict the `z-score_cutoff`. The model is trained on data from previous years and tested on the most recent year to simulate a real-world prediction scenario.
5.  **Evaluation**: The model's performance is evaluated using:
    -   **Mean Absolute Error (MAE)**: ~0.13
    -   **R-squared (R2)**: ~0.78

The trained and serialized model is saved in `model/model.joblib`.

## Directory Structure

```
.
├── cops/              # Raw Z-Score cutoff data
├── model/             # Saved machine learning model
│   └── model.joblib
├── perfs/             # Raw A/L performance data
├── processed_datasets/ # Cleaned and merged datasets
├── streams/           # Degree-to-stream mapping data
├── explore.ipynb      # Jupyter notebook with data exploration, processing, and model training
├── pyproject.toml     # Project dependencies
└── README.md          # This file
```

## How to run model using the notebook

The `explore.ipynb` notebook contains the complete code for data processing, model training, and prediction.

To get degree recommendations, you can use the `get_top_5_accessible_degrees` function defined in the notebook, which requires the following inputs:

-   `user_z_score` (float): The student's Z-score.
-   `stream` (str): The student's A/L stream (e.g., "biological science").
-   `district` (str): The student's district (e.g., "colombo").

The function will return a list of the top 5 degree programs the student is likely to be admitted to, along with the predicted cutoff scores.

## Contributions (for the ML model)
- 22ug1-0093 -  M. C. R. Mallawaarachchi
- 22ug1-0499 - Dunal Senitha De Mel
