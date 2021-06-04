# iproject-server

API server for Individual Project

&nbsp;

## RESTful endpoints

&nbsp;

### POST /login

> Login to your Google account.

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": "<your email>",
    "password": "<your secret password>"
}
```

_Response (200)_

```
{
  "access_token": "<auto generated access token>"
}
```

_Response (500)_

```
{
  "message": "Internal server error."
}
```

---

&nbsp;

### POST /search

> Search for a youtube video.

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "searchDetails": "<String for search details>",
}
```

_Response (200)_

```
{
  "results": [
    {
      "kind": "youtube#video",
      "url": "https://www.youtube.com/watch?v=E07s5ZYygMg",
      "id": "E07s5ZYygMg",
      "publishedAt": "2020-05-18T16:00:11.000Z",
      "channelId": "UCbOCbp5gXL8jigIBZLqMPrw",
      "title": "Harry Styles - Watermelon Sugar (Official Video)",
      "description": "Lyrics: Tastes like strawberries On a summer evening And it sounds just like a song I want more berries And that summer feeling It's so wonderful and warm ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "HarryStylesVEVO",
      "liveBroadcastContent": "none"
    },
    {
      "kind": "youtube#video",
      "url": "https://www.youtube.com/watch?v=E07s5ZYygMg",
      "id": "E07s5ZYygMg",
      "publishedAt": "2020-05-18T16:00:11.000Z",
      "channelId": "UCbOCbp5gXL8jigIBZLqMPrw",
      "title": "Harry Styles - Watermelon Sugar (Official Video)",
      "description": "Lyrics: Tastes like strawberries On a summer evening And it sounds just like a song I want more berries And that summer feeling It's so wonderful and warm ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/E07s5ZYygMg/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "HarryStylesVEVO",
      "liveBroadcastContent": "none"
    },
    ]
}
```

_Response (500)_

```
{
  "message": "Internal server error."
}
```

---

&nbsp;

### POST /lyrics

> Search for a lyric.

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "artist": "< artist name >",
    "title": "< title name >",
}
```

_Response (200)_

```
{
  "lyrics": "< Lyrics of your song >"
}
```

_Response (500)_

```
{
  "message": "Internal server error."
}
```
