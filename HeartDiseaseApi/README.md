This microservice is designed to process patient inputs for cardiovascular disease risk


The input data is transmitted in json format, an example is shown below
```json
[
    {"Smoking": "No", "AlcoholDrinking": "Yes", "Stroke": "No",
    "PhysicalHealth": 17, "MentalHealth": 12, "DiffWalking": "No",
    "Sex": "Male", "Diabetic": "No", "PhysicalActivity": "No",
    "SleepTime": 8, "Asthma": "No", "KidneyDisease": "No", "SkinCancer": "No"}
]
```

Below is a description of the input data and its specifics

1. Smoking : Have you smoked at least 100 cigarettes in your entire life? (Yes or No ).
2. AlcoholDrinking : Heavy drinkers (adult men having more than 14 drinks per week and adult women having more than 7 drinks per week (Yes or No)
3. Stroke : (Ever told) (you had) a stroke? (Yes or No)
4. PhysicalHealth : Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good? (0-30 days, float).
5. MentalHealth : Thinking about your mental health, for how many days during the past 30 days was your mental health not good? (0-30 days, float).
6. DiffWalking : Do you have serious difficulty walking or climbing stairs? (Yes or No)
7. Sex (Male or Female)
8. Diabetic : (Ever told) (you had) diabetes? (Yes or No)
9. PhysicalActivity : Adults who reported doing physical activity or exercise during the past 30 days other than your regular job. (Yes or No)
10. SleepTime : On average, how many hours of sleep do you get in a 24-hour period?
11. Asthma : (Ever told) (you had) asthma? (Yes or No)
12. KidneyDisease : Not including kidney stones, bladder infection or incontinence, were you ever told you had kidney disease? (Yes or No)
13. SkinCancer : (Ever told) (you had) skin cancer? (Yes or No)

To run this app you need for the first download [encoder](HeartDiseaseApi\models\KNeighborsClassifier().joblib) and [model](https://drive.google.com/drive/folders/1SLmddMYpqFHlm2Z40A9PtDbwwJQ8oI_5?usp=drive_link) and pase them into the appropriate directories