# Ted's Cinema App Server
Ted's Cinema App is an application to show you what newest movie right now. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
## Endpoint List
- POST /register
- POST /login
- POST /googlelogin
- GET /nowPlayings
- GET /comingSoons
- GET /cinemas
- GET /nameSearch

### POST /register

> Create new User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": <Your email>,
    "username": <Your username>,
    "password": <Your secret password>
}
```

_Response (201 - Created)_
```
{
    "id": <New ID>,
    "email": <Your email>,
    "username": <Your username>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation error"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /login

> Login to app

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": <Your email>,
    "password": <Your secret password>
}
```

_Response (200 - OK)_
```
{
    "id": <Your ID>,
    "email": <Your email>,
    "access_token": "<your access token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /googlelogin

> Login to app with gmail account

_Request Header_
```
not needed
```

_Request Body_
```
{
    idToken: <Your id token>
}
```

_Response (200 - OK)_
```
{
    "id": <Your ID>,
    "email": <Your email>,
}
```

_Response (201 - CREATED)_
```
{
    "id": <Your new ID>,
    "email": <Your email>,
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /comingSoons

> Get movie data is coming soon in cinema

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "url": "https://jadwalnonton.com/film/2021/jakarta-vs-everybody/",
        "title": "JAKARTA VS EVERYBODY",
        "img": "https://www.jadwalnonton.com/data/images/movies/2021/jakarta-vs-everybody-11jvey_300x450.jpg"
    },
    {
        "url": "https://jadwalnonton.com/film/2021/fast-furious-9/",
        "title": "FAST & FURIOUS 9",
        "img": "https://www.jadwalnonton.com/data/images/movies/2021/fast-furious-9-20ffs9_300x450.jpg"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /nowPlayings

> Get movie data is now playing in cinema

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "url": "https://jadwalnonton.com/film/2021/the-conjuring-the-devil-made-me-do-it/",
        "title": "THE CONJURING: THE DEVIL MADE ME DO IT",
        "img": "https://www.jadwalnonton.com/data/images/movies/2021/the-conjuring-the-devil-made-me-do-it-8d43f41c_300x450.jpg"
    },
    {
        "url": "https://jadwalnonton.com/film/2020/a-quiet-place-part-ii/",
        "title": "A QUIET PLACE PART II",
        "img": "https://www.jadwalnonton.com/data/images/movies/2020/a-quiet-place-part-ii-e499460b_300x450.jpg"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /cinemas

> Get all data cinema in Indonesia

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "image": "https://www.jadwalnonton.com/data/images/theaters/arion-xxi-jakarta_430x280.jpg",
        "nama": "Bioskop ARION XXI JAKARTA"
    },
    {
        "image": "https://www.jadwalnonton.com/data/images/theaters/artha-gading-xxi-ft_430x280.jpg",
        "nama": "Bioskop ARTHA GADING XXI JAKARTA"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /nameSearch

> Search data movie by name

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Query_
```
{
    "query": <your query>,
    "page": <your query>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "adult": false,
        "backdrop_path": "https://image.tmdb.org/t/p/original/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
        "genre_ids": [
            28,
            12,
            878
        ],
        "id": 399566,
        "original_language": "en",
        "original_title": "Godzilla vs. Kong",
        "overview": "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.",
        "popularity": 1417.39,
        "poster_path": "https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg",
        "release_date": "2021-03-24",
        "title": "Godzilla vs. Kong",
        "video": false,
        "vote_average": 8.1,
        "vote_count": 5792
    },
    {
        "adult": false,
        "backdrop_path": "https://image.tmdb.org/t/p/original/nVodCGKYLpqNC8YwQAbivKlWCgZ.jpg",
        "genre_ids": [
            28,
            12,
            14
        ],
        "id": 293167,
        "original_language": "en",
        "original_title": "Kong: Skull Island",
        "overview": "Explore the mysterious and dangerous home of the king of the apes as a team of explorers ventures deep inside the treacherous, primordial island.",
        "popularity": 81.474,
        "poster_path": "https://image.tmdb.org/t/p/original/r2517Vz9EhDhj88qwbDVj8DCRZN.jpg",
        "release_date": "2017-03-08",
        "title": "Kong: Skull Island",
        "video": false,
        "vote_average": 6.5,
        "vote_count": 8214
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### POST /watchLists

> Add data movie to watch list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "title": <movie title>
}
```

_Response (200 - OK)_
```
{
    "id": 2,
    "title": "CRUELLA",
    "imageUrl": "https://www.jadwalnonton.com/data/images/movies/2021/cruella-c4e408ae_300x450.jpg",
    "UserId": 1,
    "updatedAt": "2021-06-03T05:20:26.304Z",
    "createdAt": "2021-06-03T05:20:26.304Z"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /watchLists

> Get all data watch list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 2,
        "title": "CRUELLA",
        "imageUrl": "https://www.jadwalnonton.com/data/images/movies/2021/cruella-c4e408ae_300x450.jpg",
        "UserId": 1
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---