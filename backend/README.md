# Backend for the UniPredict


##  `/predict_zscore/` – Predict Top 5 Accessible Degrees

###  Description

This POST endpoint accepts a student's Z-score, stream, and district, then returns the top 5 university degree programs that the student is most likely to gain admission to.

---

### URL
POST /predict_zscore/


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
  "predicted_z_score": [
    {
      "degree": "BSc Engineering - University of Moratuwa",
      "predicted_cutoff": 1.42,
      "margin": 0.08
    },
    {
      "degree": "BSc Computer Science - University of Peradeniya",
      "predicted_cutoff": 1.35,
      "margin": 0.15
    }
    // up to 5 entries
  ]
}
```


