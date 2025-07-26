# TODO

---

## 📊 1. Data Collection & Preprocessing

- [x] Define input features: Z-score, GPA, subject stream, district, preferences
- [x] Collect dataset
- [] Preprocess:
  - [x] Handle missing/null values
  - [x] Normalize numeric features
  - [x] Encode categorical features (e.g., one-hot)
- [ ] Split into `train`, `val`, and `test` sets
- [ ] Save preprocessed datasets in `data/` as `.csv`

---

## 🤖 2. Model Development (in Jupyter)

- [x] Create a notebook in `ml/` for:
  - [ ] EDA (exploratory data analysis)
  - [ ] Model training: start with Logistic Regression, then XGBoost
  - [ ] Evaluation: accuracy, precision@k, confusion matrix
- [ ] Save trained model using `joblib` or `pickle`
- [ ] Convert notebook logic into a script (`train.py`) for CLI use
- [ ] CLI script should support:
  - [ ] `train`
  - [ ] `evaluate`
  - [ ] `save-model`

---

## 🧠 3. Model Serving (Backend API)

- [x] Create FastAPI app in `backend/`
- [ ] Load model from `ml/` or `/models`
- [ ] Create API endpoint:
  - `POST /recommend` → input: student info, output: course list
- [ ] Use `pydantic` for request/response schemas
- [ ] Add validation for input fields
- [ ] Run app using `uvicorn`

---

## 🌐 4. Frontend Web App

- [x] Create `frontend/`
- [ ] Use **Svelte + Vite** (or React)
- [ ] Pages/components:
  - [ ] Input form for Z-score, subject stream, preferences
  - [ ] Output view for recommended courses
- [ ] Connect to backend via `fetch()` or Axios
- [ ] Simple UI with form validation

---

## 🔁 5. ML Workflow (MLOps Basics)

- [ ] Store datasets and model files under version control
- [ ] Add basic model evaluation report/logging
- [ ] Write `Makefile` or `CLI tool` for:
  - [ ] `train`
  - [ ] `evaluate`
  - [ ] `start-api`
- [ ] Consider using DVC (optional) for dataset/model versioning

---

## 🐳 6. DevOps & CI/CD

- [ ] Write Dockerfile for `backend/`
- [ ] Optional: Dockerfile for `frontend/`
- [ ] Add `docker-compose.yml` to run full stack
- [ ] Add `.env` files for config
- [ ] Set up GitHub Actions:
  - [ ] Lint and test backend
  - [ ] Build Docker image
  - [ ] Optional: deploy to Render/Fly.io

---

## ✅ 7. Testing

- [ ] Backend tests using `pytest`
- [ ] API tests with `httpx` or `requests`
- [ ] Frontend unit/component tests with `vitest` or `jest`
- [ ] Add CI job to run tests on push

---

## 🛠️ Explorable Tools

| Area           | Tool                      |
|----------------|---------------------------|
| ML Model       | `scikit-learn`, `XGBoost` |
| Notebook       | `Jupyter`                 |
| Model I/O      | `joblib`                  |
| API Backend    | `FastAPI`, `pydantic`     |
| Frontend       | `Svelte` or `React`       |
| Python Packages| `uv`                      |
| Containers     | `Docker`, `docker-compose`|
| CI/CD          | `GitHub Actions`          |
| Versioning     | `Git`, optionally `DVC`   |

---

## 🧾 Notes

- ✅ Start model development in a **Jupyter notebook**
- ✅ Use a **monorepo** to simplify dev and integration
- ✅ `uv`  can be used for Python dependency management. It's fast and modern.
