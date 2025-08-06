# Backend for the UniPredict


##  `/recommend/` – Predict Top 5 Accessible Degrees

###  Description

This POST endpoint accepts a student's Z-score, stream, and district, then returns the top 5 university degree programs that the student is most likely to gain admission to.

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


