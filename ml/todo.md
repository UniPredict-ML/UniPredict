# To-Do List for Z-Score Prediction Model Training
---

## Checklist:

- [x] **Set up the Python Environment:**
    - [x] Install `pandas`,  `scikit-learn` and `ipykernel`. If not, use `uv add pandas scikit-learn`.

- [x] **Load the Dataset:**
    - [x] Load `final_z_scores_with_sat_data.csv` into a pandas DataFrame.

- [x] **Handle Missing Values (`NaN`):**
    - [x] **Inspect Missing Data:** Check for `NaN` values in all columns, especially `Z-Score`.
    - [x] **Decide Strategy:**
        - [x] For `Z-Score` (the target): It's generally best to **remove rows** where `Z-Score` is `NaN`, as we cannot train a model without the target.
        - [x] For `Number` and `Passed` (if any `NaN`s exist): Consider **imputation** (e.g., fill with the mean/median of the respective stream/year, or a constant like 0 if appropriate).
        - [x] For `Stream` (if any `NaN`s exist from the mapping): we might need to investigate why they are `NaN` and either remove those rows or assign a "Unknown" category. (Assigned as 'Unknown')

- [x] **Feature Engineering (Optional but Recommended):**
    - [x] **Create `Passed_Ratio`:** Calculate `Passed / Number` to get the proportion of eligible students, which might be a more informative feature than raw counts.
    - [x ] **Consider `Year` as a feature:** While `Year` is numerical, we might consider if its effect is linear or if treating it as a categorical feature (e.g., one-hot encoding it) could capture year-specific trends better. For now, try with keeping it numerical.

- [x] **Encode Categorical Features:**
    - [x] Identify categorical columns: `District`, `Programme`, `Stream`.
    - [x] Apply **One-Hot Encoding** to these columns. This converts them into numerical format suitable for Random Forest, avoiding any false sense of order. `scikit-learn`'s `OneHotEncoder` or `pandas.get_dummies()` can do this.

- [x] **Define Features (X) and Target (y):**
    - [x] Separate the DataFrame into:
        - [x] `X` (features): All columns except `Z-Score`.
        - [x] `y` (target): The `Z-Score` column.

- [x] **Data Splitting (Chronological):**
    - [x] This is crucial for time-series-like data. **Do NOT use random splitting.**
    - [x] **Option A (Simpler):** Split the data based on `Year`. For example, use data from 2019-2022 for training and 2023 for testing.
    - [x] **Option B (More Robust):** Use a time-series cross-validation approach.
- [x] **Train the Random Forest Regressor Model:**
    - [x] Import `RandomForestRegressor` from `sklearn.ensemble`.
    - [x] Initialize the model.
    - [x] Fit the model to the training data (`X_train`, `y_train`).

- [x] **Evaluate the Model:**
    - [x] Make predictions on the test set (`X_test`).
    - [x] Calculate regression metrics to assess performance:
        - [x] **Mean Absolute Error (MAE):** Average absolute difference between predictions and actual values.
        - [x] **Mean Squared Error (MSE) / Root Mean Squared Error (RMSE):** Penalizes larger errors more. RMSE is in the same units as the target.
        - [x] **R-squared (R2 Score):** Explains the proportion of variance in the target that's predictable from the features.

- [x] **Make Predictions for Future Years:**
    - [x] To predict for a new year (e.g., 2024), we'll need to create a new DataFrame with the `District`, `Programme`, `Stream`, and estimated `Number`/`Passed` values for 2024.
    - [x] Apply the **same preprocessing steps** (missing value handling, one-hot encoding) to this new data as we did for the training data.
    - [x] Use the trained model's `predict()` method on this new, preprocessed data.
