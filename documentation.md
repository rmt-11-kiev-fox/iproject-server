# MyAnimalList
MyAnimalList is an application to educate children about animals
​
List of available endpoints:
​
- `POST /register`
- `POST /login`

### POST /register

Request:

- data:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "Validation Error",
  "errors": "array"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login

Request:

- data:

```json
{
  "identity": "string", //username or email
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "Invalid Email or Password"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### GET /animals

Additional Request:

- header:
  access_token

Response:

- status: 200
- body:
  ​

```json
{
  "UserId": "Integer",
  "animals": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "image_URL": "string",
        "habitat": "string",
        "type": "string",
        "isNocturnal": "boolean",
        "isDiurnal": "boolean",
        "totalFavorite": "integer",
        "Users": [
            {
                "id": "integer",
                "FavoriteAnimal": {
                    "UserId": 1,
                    "AnimalId": 1,
                    "createdAt": "2021-05-13T01:40:31.000Z",
                    "updatedAt": "2021-05-13T01:40:31.000Z"
                }
            }
        ]
      }
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### GET /animals/:animalId

Additional Request:

- header:
  access_token

Response:

- status: 200
- body:
  ​

```json
{
  "UserId": "Integer",
  "animals": {
        "id": "integer",
        "name": "string",
        "description": "string",
        "image_URL": "string",
        "habitat": "string",
        "type": "string",
        "isNocturnal": "boolean",
        "isDiurnal": "boolean",
        "totalFavorite": "integer",
        "Users": [
            {
                "id": "integer",
                "FavoriteAnimal": {
                    "UserId": 1,
                    "AnimalId": 1,
                    "createdAt": "2021-05-13T01:40:31.000Z",
                    "updatedAt": "2021-05-13T01:40:31.000Z"
                }
            }
        ]
      }
}
```

- status: 404
- body:
  ​

```json
{
  "message": "Animal with ID id not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### POST /favorites/:animalId

Request:

- header:
  access_token
- req.params:
  animalId

Response:

- status: 201
- body:
  ​

```json
{
    "message": "Success"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "This Animal is Already in Your Favorite List"
}
```

- status: 401
- body:
  ​

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:
  ​

```json
{
  "message": "Animal with ID id not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### DELETE /favorites/:animalId

Request:

- header:
  access_token
- req.params:
  animalId

Response:

- status: 200
- body:
  ​

```json
{
    "message": "Remove Success"
}
```

- status: 400
- body:
  ​

```json
{
  "message": "Remove Failed"
}
```

- status: 401
- body:
  ​

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:
  ​

```json
{
  "message": "Animal with ID id not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### GET /favorites

Request:

- header:
  access_token

Response:

- status: 200
- body:
  ​

```json
{
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "Animals": [
            {
                "id": "integer",
                "name": "string",
                "description": "string",
                "image_URL": "string",
                "habitat": "string",
                "type": "string",
                "isNocturnal": "boolean",
                "isDiurnal": "boolean",
                "totalFavorite": "integer",
                "FavoriteAnimal": {
                    "UserId": "integer",
                    "AnimalId": "integer",
                    "createdAt": "date",
                    "updatedAt": "date"
                }
            },
            {
                "id": "integer",
                "name": "string",
                "description": "string",
                "image_URL": "string",
                "habitat": "string",
                "type": "string",
                "isNocturnal": "boolean",
                "isDiurnal": "boolean",
                "totalFavorite": "integer",
                "FavoriteAnimal": {
                    "UserId": "integer",
                    "AnimalId": "integer",
                    "createdAt": "date",
                    "updatedAt": "date"
                }
            }
        ]
    }
}
```

- status: 401
- body:
  ​

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```