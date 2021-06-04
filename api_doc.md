# TriviaSiks App API Documentation

TriviaSiks App is an application to play trivia games in real time.

This app has:

-   RESTful endpoints
-   JSON formatted response

## RESTful endpoints

### POST /register

> Register new username

_Request Header_

```
not needed
```

_Request Body_

```
{
	"username": "user123",
	"password": "12341234"
}
```

_Request Params_

```
not needed
```

_Response (201)_

```
{
  "id": 17,
  "username": "user123"
}
```

_Response (400 - Bad Request)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "<error_message>"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

---

### POST /register

> Login with username and password

_Request Header_

```
not needed
```

_Request Body_

```
{
	"username": "user123",
	"password": "12341234"
}
```

_Request Params_

```
not needed
```

_Response (200)_

```
{
  "id": 17,
  "username": "user123",
  "point": 0,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoidXNlcjEyMyIsImlhdCI6MTYyMjc3OTUxMywiZXhwIjoxNjI1MzcxNTEzfQ._djT0kU2hH-6osVdl-lNWBuW_kIpHQGYAlRZ2kOfnsk"
}
```

_Response (400 - Bad Request)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "<error_message>"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

---

### GET /users

> Get all users data

_Request Header_

```
{
    "access_token": <jsonwebtoken>
}
```

_Request Params_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 1,
    "username": "user1",
    "point": 1060,
    "createdAt": "2021-06-03T08:19:50.045Z",
    "updatedAt": "2021-06-03T17:04:21.675Z"
  },
  {
    "id": 2,
    "username": "user2",
    "point": 330,
    "createdAt": "2021-06-03T08:19:50.045Z",
    "updatedAt": "2021-06-03T17:04:21.675Z"
  }
]
```

_Response (401 - Unauthorized)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "<error_message>"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

---

### PATCH /users/:id

> Update point of one user

_Request Header_

```
{
    "socket_key": <server_socket_key>
}
```

_Request Body_

```
{
	"point": 2000
}
```

_Request Params_

```
{
    "id": <user_id>
}
```

_Response (200)_

```
{
  "message": "User's point updated successfully!"
}
```

_Response (400 - Bad Request)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "<error_message>"
        }
    ]
}
```

_Response (401 - Unauthorized)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "<error_message>"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

---

### GET /questions

> Get a random question

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Response (200)_

```
{
  "category": "History",
  "question": "Which of the following countries was not an axis power during World War II?",
  "correct_answer": " Soviet Union",
  "incorrect_answers": [
    "Italy",
    "Germany",
    "Japan"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

### GET /chats

> Get chats history

_Request Header_

```
{
    "access_token": <jsonwebtoken>
}
```

_Request Params_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 3,
    "UserId": 2,
    "message": "Hello",
    "createdAt": "2021-06-03T15:19:39.159Z",
    "updatedAt": "2021-06-03T15:19:39.159Z",
    "User": {
      "id": 2,
      "username": "user2",
      "point": -40,
      "createdAt": "2021-06-03T12:57:53.490Z",
      "updatedAt": "2021-06-03T15:18:32.349Z"
    }
  },
  {
    "id": 2,
    "UserId": 1,
    "message": "Hi",
    "createdAt": "2021-06-03T15:19:27.282Z",
    "updatedAt": "2021-06-03T15:19:27.282Z",
    "User": {
      "id": 1,
      "username": "user1",
      "point": 400,
      "createdAt": "2021-06-03T12:57:53.490Z",
      "updatedAt": "2021-06-03T15:18:32.349Z"
    }
  },
  {
    "id": 1,
    "UserId": null,
    "message": "Correct answer: Radius",
    "createdAt": "2021-06-03T15:19:15.363Z",
    "updatedAt": "2021-06-03T15:19:15.363Z",
    "User": null
  }
]
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```

### POST /chats

> Create new chat

_Request Header_

```
{
    "access_token": <jsonwebtoken>
}
```

\_Request Body

```
{
	"message": "hello"
}
```

_Request Params_

```
not needed
```

_Response (201)_

```
{
  "id": 3,
  "UserId": 1,
  "message": "hello",
  "updatedAt": "2021-06-02T07:03:17.982Z",
  "createdAt": "2021-06-02T07:03:17.982Z"
}
```

_Response (500 - Internal Server Error)_

```
{
    "name": "<error_name>",
    "errors": [
        {
            "message": "Internal server error!"
        }
    ]
}
```
