# iproject-server
API server for Individual Project

POST /user/register

- request body
```
{
  userName: req.body.userName,
  email: req.body.email,
  password: req.body.password,
  birthDate: req.body.birthDate,
  gender: req.body.gender,
  weight: req.body.weight,
  height: req.body.height
}
```

- response
```
201: {
  "id": integer,
  "email": "string",
  "userName": "string"
}

400: {
  "message": [
    "User Name already exist"
  ]
}

{
  "message": [
    "User Name must not be empty"
  ]
}

{
  "message": [
    "Email must an email format"
  ]
}

{
  "message": [
    "Password must not be empty"
  ]
}

{
  "message": [
    "weight must not be less than 20 kg"
  ]
}

{
  "message": [
    "Height must not be less than 60 cm"
  ]
}

{
  "message": [
    "Height must not be 300 cm or up"
  ]
}
```

---

POST /user/login

- request body
```
{ userName, email, pasword }
```

- response

```
200: { "access_token": "string" }

400:
{
  "message": "Password must not be empty"
}

404:
{
  "message": "User not found"
}
```

---
Authentication

- request headers

```
access_token= "string"
```

response

```
404:
{
  msg: `Access denied`,
}

(No access_token)
404:
{
  message: 'Please login first'
}
```

POST /fitness

- request body
```
{
    "currentWeight": integer
}
```

- response
```
201:
{
  "id": integer,
  "UserId": integer,
  "currentWeight": integer,
  "date": DATEONLY,
  "calories": integer,
  "protein": integer,
  "carbohydrates": integer,
  "fat": integer,
  "updatedAt": DATE,
  "createdAt": DATE
}

400:
{
  "message": [
    "Cannot create duplication of data of today's date: <DATEONLY>"
  ]
}

{
  "message": [
    `Calories, Protein, Carbohydrates, or Fat cannot be null`
  ]
}
```

---


GET /fitness

- response

```
200:
{
  "id": integer,
  "UserId": integer,
  "currentWeight": integer,
  "date": DATEONLY,
  "calories": integer,
  "protein": integer,
  "carbohydrates": integer,
  "fat": integer,
  "updatedAt": DATE,
  "createdAt": DATE,
  "ExerciseLogs": [],
  "FoodLogs": []
}

404:
{
  "message": [
    "No data found"
  ]
}

```

---

GET /fitness/date (week: default, month, year)

- request body
```
newSpecificTime = req.body.specificTime
```
notes: week = the last 7 days (not per week in a month)

- response
```
200:
{
  {
    "id": integer,
    "UserId": integer,
    "currentWeight": integer,
    "date": DATEONLY,
    "calories": integer,
    "protein": integer,
    "carbohydrates": integer,
    "fat": integer,
    "updatedAt": DATE,
    "createdAt": DATE,
    "ExerciseLogs": [],
    "FoodLogs": []
  },
  {
    "id": integer,
    "UserId": integer,
    "currentWeight": integer,
    "date": DATEONLY,
    "calories": integer,
    "protein": integer,
    "carbohydrates": integer,
    "fat": integer,
    "updatedAt": DATE,
    "createdAt": DATE,
    "ExerciseLogs": [],
    "FoodLogs": []
  }
}

404:
{
  "message": [
    "No data found"
  ]
}
```

POST /fitness/exercise

- request body
```
{
  "exerciseName": "string",
  "notes": "string",
  "repetitions": integer,
  "sets": integer,
  "time": integer
}
```

- response
```
201:
{
  "id": integer,
  "UserDataId": integer,
  "exerciseName": "string",
  "notes": "string",
  "repetitions": integer,
  "sets": integer,
  "time": integer,
  "updatedAt": DATE,
  "createdAt": DATE
}

404:
{
  "message": [
    `You must first create today's data user before creating any exercises`
  ]
}
```

POST /fitness/food

- request body
```
{
  "foodName": "string",
  "category":"string",
  "imageUrl": "string",
  "calories": integer,
  "protein": integer,
  "carbohydrates": integer,
  "fat": integer
}
```

- response
```
201:{
  "newlyAddedFood": {
    "id": inter,
    "UserDataId": integer,
    "foodName": "string",
    "category": "string",
    "imageUrl": "string",
    "calories": integer,
    "protein": integer,
    "carbohydrates": integer,
    "fat": integer,
    "updatedAt": DATE,
    "createdAt": DATE
  },
  "previousData": {
    "id": integer,
    "UserId": integer,
    "date": DATEONLY,
    "currentWeight": integer,
    "calories": integer,
    "protein": integer,
    "carbohydrates": integer,
    "fat": integer,
    "createdAt": "DATE",
    "updatedAt": "DATE"
  },
  "updatedData": [
    {
      "id": integer,
      "UserId": integer,
      "date": DATEONLY,
      "currentWeight": integer,
      "calories": integer,
      "protein": integer,
      "carbohydrates": integer,
      "fat": integer,
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  ]
}

400:
{
  "message": [
    "Cannot create duplication of data of today's date: <DATEONLY>"
  ]
}

{
  "message": [
    `Calories, Protein, Carbohydrates, or Fat cannot be null`
  ]
}
```

---

---

PATCH /food/:id

- request params
```
{
  "id": <id of a food>
}
```

- response
```
200:
{
  message: `Successfully updated today's food`
  "previousData": {
    "id": integer,
    "UserId": integer,
    "date": DATEONLY,
    "currentWeight": integer,
    "calories": integer,
    "protein": integer,
    "carbohydrates": integer,
    "fat": integer,
    "createdAt": "DATE",
    "updatedAt": "DATE"
  },
  "updatedData": [
    {
      "id": integer,
      "UserId": integer,
      "date": DATEONLY,
      "currentWeight": integer,
      "calories": integer,
      "protein": integer,
      "carbohydrates": integer,
      "fat": integer,
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  ]
}

404:
{
  "message": "No Item found"
}

400:
{
  "message": "You cannot modify or delete a history item"
}
```

