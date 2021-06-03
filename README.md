# iproject-server

API server for Individual Project

# POST/register

_request body_

```
{
    "email": <from user>,
    "password": <from user>,
}
```

_response_(201)

```
{
    "email": <from user>
    "password": <from user>
}
```

```
_response_(400)
{
    message: "Bad Request failed to create"
}
```

```
_response_(500)
{
    message: "Internal Server Error"
}
```

# POST/login

_request body_

```
{
    "email": <from user>,
    "password": <from user>,
}
```

_response_(200)

```
{
    "access_token": <access_token>
}
```

# GET/WatchWishlist

_response_(200)

```
{
    "id": <id>
    "cateogy": <cateogy>
    "MovieId": <MovieId>
    "posterPath": <posterPath>
    "title": <title>
    "releaseDate": <releaseDate>
    "createdAt": <createdAt>
    "updatedAt": <updatedAt>
}
```

_response_(500)

```
{
    message: "Internal Server Error"
}
```

# POST/WatchWishlist

_request body_

```
{
    "cateogy": <cateogy>
    "MovieId": <MovieId>
    "posterPath": <posterPath>
    "title": <title>
    "releaseDate": <releaseDate>
    "createdAt": <createdAt>
    "updatedAt": <updatedAt>
}
```

_response_(500)

```
{
    message: "Internal Server Error"
}
```
