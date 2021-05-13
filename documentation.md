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