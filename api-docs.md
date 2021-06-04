# kanban-app-server

​
List of available endpoints:
​

- `POST /register`
- `POST /login`

And routes below need authentication

- `GET /patients`
- `GET /patients/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`


### POST /register

Request:

- data:

```json
{
    "full_name": "string",    
    "email": "string",
    "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "id": 3,
    "email": "test@dev.com"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "logged_in_as": "novizh@dev.com",
    "access_token": "access-token"
}
```

### GET /patients

Description: Get all patients

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "gender": "male",
            "birth_year": 1986,
            "symptoms": [
                9,
                10,
                11
            ],
            "user_id": 1,
            "createdAt": "2021-06-01T09:35:25.684Z",
            "updatedAt": "2021-06-01T09:35:25.684Z"
        },
        {
            "id": 6,
            "first_name": "Janea",
            "last_name": "Adams",
            "gender": "female",
            "birth_year": 1991,
            "symptoms": [
                175,
                139
            ],
            "user_id": 1,
            "createdAt": "2021-06-03T05:15:19.717Z",
            "updatedAt": "2021-06-03T05:15:19.717Z"
        },
        {
            "id": 7,
            "first_name": "Andrea",
            "last_name": "Deane",
            "gender": "female",
            "birth_year": 1991,
            "symptoms": [
                238
            ],
            "user_id": 1,
            "createdAt": "2021-06-03T05:15:43.973Z",
            "updatedAt": "2021-06-03T05:15:43.973Z"
        },
        {
            "id": 10,
            "first_name": "test",
            "last_name": "test",
            "gender": "male",
            "birth_year": 1986,
            "symptoms": [
                92,
                122
            ],
            "user_id": 1,
            "createdAt": "2021-06-03T05:19:00.722Z",
            "updatedAt": "2021-06-03T05:19:00.722Z"
        }
    ]
}
```

### GET /tasks/:id

Description: Get a patients and diagnosis

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
{
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "gender": "male",
        "birth_year": 1986,
        "symptoms": [
            9,
            10,
            11
        ],
        "user_id": 1,
        "createdAt": "2021-06-01T09:35:25.684Z",
        "updatedAt": "2021-06-01T09:35:25.684Z"
    },
    "diagnosis": [
        {
            "Issue": {
                "ID": 11,
                "Name": "Flu",
                "Accuracy": 90,
                "Icd": "J10;J11",
                "IcdName": "Influenza due to other identified influenza virus;Influenza, virus not identified",
                "ProfName": "Influenza",
                "Ranking": 1
            },
            "Specialisation": [
                {
                    "ID": 15,
                    "Name": "General practice",
                    "SpecialistID": 0
                },
                {
                    "ID": 19,
                    "Name": "Internal medicine",
                    "SpecialistID": 0
                }
            ]
        },
        {
            "Issue": {
                "ID": 281,
                "Name": "Food poisoning",
                "Accuracy": 87.5,
                "Icd": "A05;A02;A03;A04",
                "IcdName": "Other bacterial foodborne intoxications, not elsewhere classified;Other salmonella infections;Shigellosis;Other bacterial intestinal infections",
                "ProfName": "Foodborne illness",
                "Ranking": 2
            },
            "Specialisation": [
                {
                    "ID": 15,
                    "Name": "General practice",
                    "SpecialistID": 0
                },
                {
                    "ID": 19,
                    "Name": "Internal medicine",
                    "SpecialistID": 0
                }
            ]
        },
        {
            "Issue": {
                "ID": 376,
                "Name": "Scarlet fever",
                "Accuracy": 13.125,
                "Icd": "A38",
                "IcdName": "Scarlet fever",
                "ProfName": "Scarlatina",
                "Ranking": 3
            },
            "Specialisation": [
                {
                    "ID": 15,
                    "Name": "General practice",
                    "SpecialistID": 0
                },
                {
                    "ID": 23,
                    "Name": "Infectiology",
                    "SpecialistID": 0
                },
                {
                    "ID": 19,
                    "Name": "Internal medicine",
                    "SpecialistID": 0
                }
            ]
        }
    ]
}
```

### POST /patients

Description: Add new patients

Request:

- headers: access_token
- data:
```json
{
  "first_name": "string",
  "last_name": "string",
  "gender": "string",
  "birth_year": "string",
  "symptom1": "number",
  "symptom2": "number",
  "symptom3": "number",
  "symptom4": "number",
  "symptom5": "number"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "data": {
        "id": 11,
        "first_name": "Jane",
        "last_name": "Doe",
        "gender": "female",
        "birth_year": 1988,
        "symptoms": [
            52,
            54
        ],
        "user_id": 1,
        "updatedAt": "2021-06-04T02:34:13.375Z",
        "createdAt": "2021-06-04T02:34:13.375Z"
    }
}
```

### DELETE /patients/:id

description:
Delete one of the current logged in user task. (cannot delete another user order)

Request:

- headers: access_token
- params:
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Patient deleted successfully"
}
```
