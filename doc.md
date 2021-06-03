# IProject

## Endpoints

### 1. POST /register

### _Request Header_

```
none
```

### _Request Params_

```
none
```

### _Request Body_

```
{
      "email":"kevin@gmail.com",
      "password":"phmrakna",
      "username":"kevein",
      "image" :"ccc",
      "role":"pembeli",
      "location":2
}
```

### _Response (201 - Created)_

```
{
    "msg": "register success",
    "status": 201,
    "data": {
        "id": 10,
        "email": "kevin@gmail.com"
    }
}
```

### _Error (400 - Bad Request)_

Email unique:

```

{
    "errors": {
        "name": "Register Error",
        "status": 400,
        "message": "Username not avalaible"
    }
}

```

Validation :

```
{
    "errors": {
        "name": "Create User Failed",
        "status": 400,
        "message": [
            "Location is required",
            "Email is required",
            "Role is required",
            "Password is required",
            "Username is required"
        ]
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Register Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 2. POST /login

### _Request Header_

```
none
```

### _Request Params_

```
none
```

### _Request Body_

```
{
    "email": "kevin@gmail.com",
    "password": "testing",
    "role":"customer"
}
```

### _Response (201 - Created)_

```
{
    "msg": "register success",
    "status": 201,
    "data": {
        "id": 3,
        "email": "kevin@gmail.com"
    }
}
```

### _Error (400 - Bad Request)_

Email unique:

```

{
    "errors": {
        "name": "Register Error",
        "status": 400,
        "message": "email not avalaible"
    }
}

```

Validation :

```
{
    "errors": {
        "name": "Create User Failed",
        "status": 400,
        "message": [
            "Email is required",
            "Role is required",
            "Password is required"
        ]
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Register Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```