# iproject-server
API server for Individual Project

## RESTful Endpoint

### POST /signIn

_Request Header_
```
not needed
```

_Request Body_
```
{
    "username": "abc@cde.com",
    "password": "password"
}
```

_Response (200)_
```
{
  "username": "abc@cde.com"
  "access_token": "dsadsadadadsad"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "validation error"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /bookings

_Request Header_
```
{
    "access_token": "gfdsgfdsggs"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "bookings": [
        {
            "id": 4,
            "name": "Anto",
            "email": "Anto@mail.com",
            "people": 5,
            "notes": "dsadsadDSADSADS",
            "createdAt": "2021-06-02T12:07:14.210Z",
            "updatedAt": "2021-06-02T12:35:49.569Z"
        }
    ]
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```


### POST /bookings

_Request Header_
```
{
    "access_token": "dsadsadsadsad"
}
```

_Request Body_
```
{
    name: haha,
    email: haha@mail.com,
    people: 5,
    notes: hahahhahahha
}
```

_Response (201 - Created)_
```
{
    "bookings": {
        "id": 10,
        "name": "Joko",
        "email": "joko@mail.com",
        "people": 3,
        "notes": "hahahha",
        "updatedAt": "2021-06-04T02:04:14.422Z",
        "createdAt": "2021-06-04T02:04:14.422Z"
    }
},
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


### PUT /bookings/:id

_Request Params_
```
:id - Booking id
```

_Request Header_
```
{
    "access_token": "dsadsadsadsad"
}
```

_Request Body_
```
{
    name: haha,
    email: haha@mail.com,
    people: 5,
    notes: hahahhahahha
},
```

_Response (200 - Ok)_
```
{
    "booking": [
        {
            "id": 11,
            "name": "dsadsad",
            "email": "dsads",
            "people": 3,
            "notes": "sfdsf",
            "createdAt": "2021-06-04T02:23:15.443Z",
            "updatedAt": "2021-06-04T03:25:59.225Z"
        }
    ]
},
```

_Response (500)_
```
{
    "message": "Internal server error"
}
```

### DELETE /bookings/:id

_Request Params_
```
:id - bookings id
```

_Request Header_
```
{
    "access_token": "dsadsadsadsad"
}
```
_Response(200)_
```
{
    
    "message": 'delete success'

}
```


_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}


```

#### GET /locationPIM


_Request Body_
```
not needed
```

_Response (200)_
```
{
    "coordinatePIM": [
        {
            "lat": 100,
            "lng": 100,
            "address": "Jalan Pondok Indah",
            "postal": 12340,
        }
    ]
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /locationPS


_Request Body_
```
not needed
```

_Response (200)_
```
{
    "coordinatePS": [
        {
            "lat": 100,
            "lng": 100,
            "address": "Jalan Pondok Indah",
            "postal": 12340,
        }
    ]
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /locationMtg


_Request Body_
```
not needed
```

_Response (200)_
```
{
    "coordinateMtg": [
        {
            "lat": 100,
            "lng": 100,
            "address": "Jalan Pondok Indah",
            "postal": 12340,
        }
    ]
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /weatherPIM


_Request Body_
```
not needed
```

_Response (200)_
```
{
    weather: haze
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /weatherPS


_Request Body_
```
not needed
```

_Response (200)_
```
{
    weather: haze
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```

#### GET /weatherMtg


_Request Body_
```
not needed
```

_Response (200)_
```
{
    weather: haze
}
```

_Response (500 - Bad Request)_
```
{
    "message": "Internal Server Error"
}
```
