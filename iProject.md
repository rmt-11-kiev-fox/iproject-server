# Project: iProject

# 📁 Collection: User

## End-point: /users/register

### Description:

Method: POST

> ```
> {{host}}/users/register
> ```

### Body (**raw**)

```json
{
    "username": "testing2",
    "password": "12345"
}
```

### Respon (**raw**)

```json
{
    "id": 1,
    "username": "testing1"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /users/login

### Description:

Method: POST

> ```
> {{host}}/users/login
> ```

### Body (**raw**)

```json
{
    "username": "testing",
    "password": "123456"
}
```

### Respon (**raw**)

```json
{
    "id": 2,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0aW5nMSIsImlhdCI6MTYyMjU4MjMwMn0.dX_tjTZio-4Cj4opuRp1umsF5OvMKtMGyyOuy7g0Xx4"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /users/changePassword

### Description:

Method: PUT

> ```
> {{host}}/users/changePassword
> ```

### Headers

| Content-Type | Value                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiaWF0IjoxNjIyNTcxNzUxfQ.FfhC-J3bpGkI-4QUE3AXc9t5OgiRLLw0v78UE2lNoV4 |

### Body (**raw**)

```json
{
    "password": "123456"
}
```

### Respon (**raw**)

```json
{
    "message": "data berhasil di update, silahkan login kembali"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Playlists

## End-point: /playlists

### Description:

Method: GET

> ```
> {{host}}/playlists
> ```

### Headers

| Content-Type | Value                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiaWF0IjoxNjIyNTczMTMzfQ.K8L5rYZbtyEzei0UP5OPgDqGHn3EGPydl0_AHX84t6Y |

### Respon (**raw**)

```json
[
    {
        "id": 4,
        "title": "Menghapus Jejakmu",
        "url": "https://www.youtube.com/results?search_query=Menghapus+Jejakmu",
        "UserId": 3,
        "apiId": 193962552,
        "createdAt": "2021-06-01T21:18:38.696Z",
        "updatedAt": "2021-06-01T21:18:38.696Z"
    }
]
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /playlists

### Description:

Method: POST

> ```
> {{host}}/playlists
> ```

### Headers

| Content-Type | Value                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiaWF0IjoxNjIyNTczMTMzfQ.K8L5rYZbtyEzei0UP5OPgDqGHn3EGPydl0_AHX84t6Y |

### Body (**raw**)

```json
{
    "title": "Menghapus Jejakmu",
    "url": "https://www.youtube.com/results?search_query=Menghapus+Jejakmu",
    "id": 193962552
}
```

### Respon (**raw**)

```json
{
    "id": 2,
    "UserId": 1,
    "title": "Menghapus Jejakmu",
    "url": "https://www.youtube.com/results?search_query=Menghapus+Jejakmu",
    "apiId": 193962552,
    "updatedAt": "2021-06-01T21:17:18.940Z",
    "createdAt": "2021-06-01T21:17:18.940Z"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /playlists/:id

### Description:

Method: DELETE

> ```
> {{host}}/playlists/1
> ```

### Headers

| Content-Type | Value                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiaWF0IjoxNjIyNTczMTMzfQ.K8L5rYZbtyEzei0UP5OPgDqGHn3EGPydl0_AHX84t6Y |

### Respon (**raw**)

```json
{
    "message": "data Berhasil di delete"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Data From All REST API

## End-point: /currentDatas

### Description:

Method: GET

> ```
> {{host}}/currentDatas
> ```

### Headers

| Content-Type | Value                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiaWF0IjoxNjIyNTcyODQzfQ.EAjKW0-GSlI5sj6bn8LPkLIGArBmNORUESFYQPmydKo |

### Respon (**raw**)

```json
{
    "location": {
        "ip_address": "110.137.38.151",
        "country": "Indonesia",
        "city": "Bandar Lampung"
    },
    "weather": {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02n"
    },
    "querySearch": [
        {
            "id": 193962552,
            "query": "https://www.youtube.com/results?search_query=Menghapus+Jejakmu"
        },
        {
            "id": 92446668,
            "query": "https://www.youtube.com/results?search_query=Sahur+Tiba"
        },
        {
            "id": 201240829,
            "query": "https://www.youtube.com/results?search_query=Belum+Siap+Kehilangan"
        },
        {
            "id": 92446678,
            "query": "https://www.youtube.com/results?search_query=Lebaran+Sebentar+Lagi"
        },
        {
            "id": 134321680,
            "query": "https://www.youtube.com/results?search_query=Di+Persimpangan+Dilema"
        },
        {
            "id": 79479247,
            "query": "https://www.youtube.com/results?search_query=Perahu+Kertas+"
        },
        {
            "id": 147780362,
            "query": "https://www.youtube.com/results?search_query=Memandang+Surga"
        },
        {
            "id": 147780366,
            "query": "https://www.youtube.com/results?search_query=Sempurna"
        },
        {
            "id": 80837688,
            "query": "https://www.youtube.com/results?search_query=Lapang+Dada"
        },
        {
            "id": 80837690,
            "query": "https://www.youtube.com/results?search_query=Musim+Yang+Baik"
        }
    ],
    "dataForTitle": [
        {
            "id": 193962552,
            "title": "Menghapus Jejakmu"
        },
        {
            "id": 92446668,
            "title": "Sahur Tiba"
        },
        {
            "id": 201240829,
            "title": "Belum Siap Kehilangan"
        },
        {
            "id": 92446678,
            "title": "Lebaran Sebentar Lagi"
        },
        {
            "id": 134321680,
            "title": "Di Persimpangan Dilema"
        },
        {
            "id": 79479247,
            "title": "Perahu Kertas "
        },
        {
            "id": 147780362,
            "title": "Memandang Surga"
        },
        {
            "id": 147780366,
            "title": "Sempurna"
        },
        {
            "id": 80837688,
            "title": "Lapang Dada"
        },
        {
            "id": 80837690,
            "title": "Musim Yang Baik"
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
