## MyAnime+

This App has : Restful Endpoint for asset's CRUD operation JSON formated response

## endpoint List 
    *POST/register
    *POST/login
    *POST/glogin
    *POST/anime
    *GET/anime/:anime
    *GET/anime/:id
    *DELETE/anime/:id


## Tech Stack used to build this app :
    * NodeJs
    * Express JS Framework
    * PostgreSQL
    * Bcryptjs
    * Jsonwebtoken
    * axios
    * socket.io
    * google-auth-library
    * cors

Global Response
these response are aplied globally on all endpoints

Response (400 - Bad Request)
Response (401 - Unauthorized)
Response (500 - Internal Server Error)

## Restful endpoints

## GET /anime/:anime
Get all Anime List

Request Header
{
  "access_token": "<access_token>"
}

!! Success Response
- Status :200
- Response Body:
[
  {
         "mal_id": 20,
        "url": "https://myanimelist.net/anime/20/Naruto",
        "image_url": "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
        "title": "Naruto",
        "airing": false,
        "synopsis": "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi'...",
        "type": "TV",
        "episodes": 220,
        "score": 7.93,
        "start_date": "2002-10-03T00:00:00+00:00",
        "end_date": "2007-02-08T00:00:00+00:00",
        "members": 2050605,
        "rated": "PG-13"
    },
    {
        "mal_id": 1735,
        "url": "https://myanimelist.net/anime/1735/Naruto__Shippuuden",
        "image_url": "https://cdn.myanimelist.net/images/anime/5/17407.jpg?s=2bf24a22a339223dcadb1cdfc3307b61",
        "title": "Naruto: Shippuuden",
        "airing": false,
        "synopsis": "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the myster...",
        "type": "TV",
        "episodes": 500,
        "score": 8.18,
        "start_date": "2007-02-15T00:00:00+00:00",
        "end_date": "2017-03-23T00:00:00+00:00",
        "members": 1721318,
        "rated": "PG-13"
    },
    {
        "mal_id": 10075,
        "url": "https://myanimelist.net/anime/10075/Naruto_x_UT",
        "image_url": "https://cdn.myanimelist.net/images/anime/3/30485.jpg?s=0e585f452876ec490cd1f922d26fad36",
        "title": "Naruto x UT",
        "airing": false,
        "synopsis": "All-new animation offered throughout UNIQLO clothing stores in Japan on January 1, 2011. The DVD contains an exclusive version of Mayonaka Orchestra, by the Japanese rock band Aqua Timez. A limited nu...",
        "type": "OVA",
        "episodes": 1,
        "score": 7.4,
        "start_date": "2011-01-01T00:00:00+00:00",
        "end_date": "2011-01-01T00:00:00+00:00",
        "members": 43009,
        "rated": "PG-13"
    }
]
!! Error Response
- Status:500
- Response Body:
{
  errors[<error>]
}
=========================================================
## POST /anime
Create a new animeFav

Request Header
{
  "access_token":"string"| "<user token>"
}

Request Body
{
    title: naruto,
    picture: "https://cdn.myanimelist.net/images/anime/3/30485.jpg?s=0e585f452876ec490cd1f922d26fad36",
    description: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the myster...",
    UserId: req.user.id
}

!! Success Response
- Status :201
- Response Body:
{
    title: naruto,
    picture: "https://cdn.myanimelist.net/images/anime/3/30485.jpg?s=0e585f452876ec490cd1f922d26fad36",
    description: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the myster...",
    UserId: 12
}
!! Error Response
- Status:400
- Response Body:
{
  errors[<error>]
}
=========================================================
## DELETE /anime/:id
Delete an Anime defined by the id provided

Request Header

{
  "access_token":"string"| "<user token>"
}

!! Success Response
- Status: 200
- Response Body:
{
  "message": "Todo successfully deleted"
}

!! Error Response
- Status:400
- Response Body:
{
  errors[<errors>]
}
========================================================
## POST /register
Create new Id

Request body:
```json
{
  "name": Required | "STRING",
  "email": Required | "STRING",
  "password": Required | "STRING"
}
```
!! Success Response:
- status: 201
- Response body:

```json
{
  "id": "4",
  "username":"Licia",
  "email": "Licia@yahoo.com"
}
```
!! Error Response
- Status:400
-Response body:
{
  errors[<errors>]
}

========================================================
## POST /Login
Login Id

Request Body:
{
  email: Required | "String"
  password: Required |"String"
}

 
 !! Success Response:
- Status: 200
- Response body:
  ​

```json
{
    "id":1,
    "email": "Jed@yahoo.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJKZWRAeWFob28uY29tIiwiaWF0IjoxNjE5NTgzMzg0fQ.1x9v3F45BMLS7cqeCkL9M5ev2dI9Y9TFvwZ7Dxq8kfg"
}
```
!! Error Response
- Status:400
-Response body:
{
  errrors:[<errors>]
}
========================================================