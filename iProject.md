# Project: iProject

# 📁 Collection: User

## End-point: /users/register

### Description:

Method: POST

> ```
> /users/register
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
> /users/login
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
> /users/changePassword
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
> /playlists
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
> /playlists
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
> /playlists/1
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
> /currentDatas
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
        "city": "Bandar Lampung",
        "flag": "https://static.abstractapi.com/country-flags/ID_flag.png"
    },
    "weather": {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "https://openweathermap.org/img/wn/04d@2x.png",
        "temperature": "25 Celcius"
    },
    "querySearch": [
        {
            "id": 29,
            "apiId": 36312179,
            "query": "4gC95tJcg0TWAz3LJ2dZpN",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 45,
            "apiId": 103064721,
            "query": "3YBZIN3rekqsKxbJc9FZko",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 24,
            "apiId": 75908694,
            "query": "65OKBR5PHenXHwz84xJDHm",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 60,
            "apiId": 177783033,
            "query": "1kPpge9JDLpcj15qgrPbYX",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 25,
            "apiId": 54732556,
            "query": "3p3B7xAxKSJK5kQ6RMYczr",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 50,
            "apiId": 85298705,
            "query": "3YRCqOhFifThpSRFJ1VWFM",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 9,
            "apiId": 137043871,
            "query": "6PkOmPMlH5nPFeoCPU0lo2",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 15,
            "apiId": 198461341,
            "query": "5JxW9yxkVqHa9IlUlXDh4Z",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        },
        {
            "id": 29,
            "apiId": 36312179,
            "query": "4gC95tJcg0TWAz3LJ2dZpN",
            "createdAt": "2021-06-02T18:40:00.315Z",
            "updatedAt": "2021-06-02T18:40:00.315Z"
        }
    ],
    "dataForTitle": [
        {
            "id": 193962552,
            "title": "Menghapus Jejakmu",
            "query": "https://www.youtube.com/results?search_query=Menghapus+Jejakmu"
        },
        {
            "id": 92446668,
            "title": "Sahur Tiba",
            "query": "https://www.youtube.com/results?search_query=Sahur+Tiba"
        },
        {
            "id": 201240829,
            "title": "Belum Siap Kehilangan",
            "query": "https://www.youtube.com/results?search_query=Belum+Siap+Kehilangan"
        },
        {
            "id": 92446678,
            "title": "Lebaran Sebentar Lagi",
            "query": "https://www.youtube.com/results?search_query=Lebaran+Sebentar+Lagi"
        },
        {
            "id": 134321680,
            "title": "Di Persimpangan Dilema",
            "query": "https://www.youtube.com/results?search_query=Di+Persimpangan+Dilema"
        },
        {
            "id": 79479247,
            "title": "Perahu Kertas ",
            "query": "https://www.youtube.com/results?search_query=Perahu+Kertas+"
        },
        {
            "id": 147780362,
            "title": "Memandang Surga",
            "query": "https://www.youtube.com/results?search_query=Memandang+Surga"
        },
        {
            "id": 147780366,
            "title": "Sempurna",
            "query": "https://www.youtube.com/results?search_query=Sempurna"
        },
        {
            "id": 80837688,
            "title": "Lapang Dada",
            "query": "https://www.youtube.com/results?search_query=Lapang+Dada"
        },
        {
            "id": 80837690,
            "title": "Musim Yang Baik",
            "query": "https://www.youtube.com/results?search_query=Musim+Yang+Baik"
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
