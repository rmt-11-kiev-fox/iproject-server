# MANIS API

## RESTful endpoints

### POST /register

> User Registration

_Request Body_

```
{
    "email" : <user email>,
    "password": <user password>
}
```

_Response (201)_

```
  {
    "message":"Thank You For Joining Us! You are pierceious"
  }
```

_Response (500)_

```
{
  "message": <internal server error>
}
```

---

### POST /login

> User Login

_Request Body_

```
{
    "email": <user email>,
    "password": <user password>,
}
```

_Response (200)_

```
{
    "access_token":<access_token>
}
```

_Response (500)_

```
{
  "message": <Internal Server Error>
}
```

_Response (400 - No Email or Password)_

```
{
  "message": "Sorry, It seems you haven't input the email or password field"
}
```

_Response (404 - Wrong Email or Password)_

```
{
  "message": "Sorry, It seems your email or password maybe wrong"
}
```

_Response (404 - User Haven't Register)_

```
{
  "message": "Sorry, It seems you haven't join with us yet"
}
```

---

### GET /covid/

> Get Indonesia's Covid Data (group by Province)

_Response (200)_

```
[
    {
        "Provinsi": "Aceh",
        "Confirmed": 5,
        "Recovered": 1,
        "Deaths": 2,
        "Active cases": 3,
        "updateUnix": 1586711624479,
        "updateDate": "2020-04-12",
        "updateTime": "17:13:44.479967",
        "latitude": 4.695135,
        "longitude": 96.7493993,
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Coat_of_arms_of_Aceh.svg/1200px-Coat_of_arms_of_Aceh.svg.png"
    },
    {
        "Provinsi": "Bali",
        "Confirmed": 81,
        "Recovered": 19,
        "Deaths": 2,
        "Active cases": 60,
        "updateUnix": 1586711624479,
        "updateDate": "2020-04-12",
        "updateTime": "17:13:44.479967",
        "latitude": -8.4095178,
        "longitude": 115.188916,
        "logo": "https://4.bp.blogspot.com/-ELlrLdH0frM/WSz4AjqIWaI/AAAAAAAAASY/EF5ayA5zXn05TXw53cRUVTJeh6lzUJDDwCLcB/s400/Lambang%2BDaerah%2BProvinsi%2BBali%2B2.png"
    },
]
```

_Response (500)_

```
{
  "message": <Error Message>
}
```

---

### POST /map/suggestions

> Get Places Based On User Location
> _Request Body_

```
{
    "lat": <location's latitude>,
    "lng": <location's longitude>,
}
```

_Response (200)_

```
{
   "html_attributions" : [],
   "results" : [
      {
         "geometry" : {
            "location" : {
               "lat" : -33.870775,
               "lng" : 151.199025
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
         "name" : "Rhythmboat Cruises",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 270,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
               "width" : 519
            }
         ],
         "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         "reference" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
         "vicinity" : "Pyrmont Bay Wharf Darling Dr, Sydney"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.866891,
               "lng" : 151.200814
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "name" : "Private Charter Sydney Habour Cruise",
         "photos" : [
            {
               "height" : 426,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAAL3n0Zu3U6fseyPl8URGKD49aGB2Wka7CKDZfamoGX2ZTLMBYgTUshjr-MXc0_O2BbvlUAZWtQTBHUVZ-5Sxb1-P-VX2Fx0sZF87q-9vUt19VDwQQmAX_mjQe7UWmU5lJGCOXSgxp2fu1b5VR_PF31RIQTKZLfqm8TA1eynnN4M1XShoU8adzJCcOWK0er14h8SqOIDZctvU",
               "width" : 640
            }
         ],
         "place_id" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
         "reference" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
         "types" : [ "restaurant", "food", "establishment" ],
         "vicinity" : "Australia"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.870943,
               "lng" : 151.190311
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "name" : "Bucks Party Cruise",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 600,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAA48AX5MsHIMiuipON_Lgh97hPiYDFkxx_vnaZQMOcvcQwYN92o33t5RwjRpOue5R47AjfMltntoz71hto40zqo7vFyxhDuuqhAChKGRQ5mdO5jv5CKWlzi182PICiOb37PiBtiFt7lSLe1SedoyrD-xIQD8xqSOaejWejYHCN4Ye2XBoUT3q2IXJQpMkmffJiBNftv8QSwF4",
               "width" : 800
            }
         ],
         "place_id" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
         "reference" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
         "types" : [ "restaurant", "food", "establishment" ],
         "vicinity" : "37 Bank St, Pyrmont"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.867591,
               "lng" : 151.201196
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
         "name" : "Australian Cruise Group",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 242,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAABjeoPQ7NUU3pDitV4Vs0BgP1FLhf_iCgStUZUr4ZuNqQnc5k43jbvjKC2hTGM8SrmdJYyOyxRO3D2yutoJwVC4Vp_dzckkjG35L6LfMm5sjrOr6uyOtr2PNCp1xQylx6vhdcpW8yZjBZCvVsjNajLBIQ-z4ttAMIc8EjEZV7LsoFgRoU6OrqxvKCnkJGb9F16W57iIV4LuM",
               "width" : 200
            }
         ],
         "place_id" : "ChIJrTLr-GyuEmsRBfy61i59si0",
         "reference" : "ChIJrTLr-GyuEmsRBfy61i59si0",
         "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
         "vicinity" : "32 The Promenade, King Street Wharf 5, Sydney"
      }
   ],
   "status" : "OK"
   "info_messages" : [
      "Unsupported request parameter value: 'foo' ignored.",
      "Unsupported request parameter value: 'bar' ignored.",
  ],
}
```

_Response (500)_

```
{
  "message": <Error Message>
}
```

---
