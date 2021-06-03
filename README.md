# iproject-server

API server for Individual Project

Dahayu App is a project that provides makeup information. It performs standard CRUD actions based on RESTful concept.

This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

## End-point: sign in

### Description: sign in created user

Method: POST

> ```
> http://localhost:3000/users/signin
> ```
>
> _Request Header_

```
{
  "access_token": "<given access_token by system>"
}
```

_Request Body_

```
{
  "email": "<User email>",
  "password: "<User Password>"
}
```

_Response (200 - OK)_

```
{
  "id": <given id by system>,
  "email": "<User email>",
  "access_token": "<given by system>"
}
```

_Response (400 - Bad Request)_ => Validation Error

```
{
  "message": "invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: sign up

### Description: sign up new user

Method: POST

> ```
> http://localhost:3000/users/signup
> ```
>
> _Request Header_

```
no needed
```

_Request Body_

```
{
  "email": "<User email>",
  "password: "<User Password>"
}
```

_Response (200 - OK)_

```
{
  "id": <given id by system>,
  "email": "<User email>",
  "access_token": "<given by system>"
}
```

_Response (400 - Bad Request)_ => Validation Error

```
{
  "message": "invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: get all make up

### Description:

Method: GET

> ```
> http://localhost:3000/products
> ```

### Headers

| Content-Type | Value                |
| ------------ | -------------------- |
| access_token | generate from system |

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
        "id": 1043,
        "brand": "deciem",
        "name": "Serum Foundation",
        "price": "6.7",
        "price_sign": "$",
        "currency": "CAD",
        "image_link": "https://3bc01d2807fb1bc0d25c-a86d2521f1af8989841b9619f5314be5.ssl.cf1.rackcdn.com/products/market-img/rdn-serum-foundation-30-r-30ml.png?v=6ab9fcb8ca2abb9828afcf9dcdad9f94",
        "product_link": "https://deciem.com/product/rdn-serum-foundation-30-r-30ml",
        "website_link": "https://deciem.com/",
        "description": "Serum Foundations are lightweight medium-coverage formulations available in a comprehensive shade range across 21 shades. These foundations offer moderate coverage that looks natural with a very lightweight serum feel. They are very low in viscosity and are dispensed with the supplied pump or with the optional glass dropper available for purchase separately if preferred. ",
        "rating": null,
        "category": "liquid",
        "product_type": "foundation",
        "tag_list": [
            "water free",
            "cruelty free",
            "alcohol free",
            "oil free",
            "silicone free",
            "Vegan",
            "Gluten Free"
        ],
        "created_at": "2018-07-06T23:16:12.698Z",
        "updated_at": "2018-09-02T22:52:06.882Z",
        "product_api_url": "http://makeup-api.herokuapp.com/api/v1/products/1043.json",
        "api_featured_image": "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/043/original/open-uri20180706-4-nszgw9?1530919194",
        "product_colors": [
            {
                "hex_value": "#f4e5d6",
                "colour_name": "1.0P"
            },
            {
                "hex_value": "#f3e8d1",
                "colour_name": "1.0N"
            },
            {
                "hex_value": "#f3e8d1",
                "colour_name": "1.0NS"
            },
            {
                "hex_value": "#f2d7ba",
                "colour_name": "1.1P"
            },
            {
                "hex_value": "#efdbba",
                "colour_name": "1.1N"
            },
            {
                "hex_value": "#f0d5af",
                "colour_name": "1.2N"
            },
            {
                "hex_value": "#e5c5a1",
                "colour_name": "1.2P"
            },
            {
                "hex_value": "#e6c796",
                "colour_name": "1.2Y"
            },
            {
                "hex_value": "#e6c796",
                "colour_name": "1.2YG"
            },
            {
                "hex_value": "#e3be8e",
                "colour_name": "2.0P"
            },
            {
                "hex_value": "#e5cb9f",
                "colour_name": "2.0N"
            },
            {
                "hex_value": "#dcc399",
                "colour_name": "2.0YG"
            },
            {
                "hex_value": "#ddb279",
                "colour_name": "2.1P"
            },
            {
                "hex_value": "#dcad6d",
                "colour_name": "2.1Y"
            },
            {
                "hex_value": "#d59c62",
                "colour_name": "3.0R"
            },
            {
                "hex_value": "#d19e61",
                "colour_name": "3.0Y"
            },
            {
                "hex_value": "#b3754a",
                "colour_name": "3.1R"
            },
            {
                "hex_value": "#c28651",
                "colour_name": "3.1Y"
            },
            {
                "hex_value": "#916C4F",
                "colour_name": "3.2N"
            },
            {
                "hex_value": "#8E6346",
                "colour_name": "3.2R"
            },
            {
                "hex_value": "#664A37",
                "colour_name": "3.3N"
            }
        ]
    },
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: create make up list / add product to list

### Description:

Method: POST

> ```
> http://localhost:3000/products/add
> ```

### Headers

| Content-Type | Value                |
| ------------ | -------------------- |
| access_token | generate from system |

_Request Body_

```
{
    brand: "pure anada",
    name: "Pure Anada Loose mineral foundation",
    description: "Pure Anada Loose mineral foundation",
    "description": "Pure Anada mineral foundation has the ability to provide full coverage, \\nwhile still feeling light and natural. No more silicone based \\nfoundations that can stifle your pores. With Pure Anada your skin can \\n“breathe”. This results in a healthier, younger looking complexion.You\\n can be assured that when you use Pure Anada, you are using a truly \\nnatural product. Pure Anada has done the research, and are committed to \\nusing the safest, purest ingredients available. It is not necessary to \\nadd preservatives to this loose mineral products. The raw minerals used \\nin Pure Anada are inert, and do not support the growth of bacteria, mold\\n or fungi.Pure Ananda boasts an extensive array of mineral \\ncolors to suit all skin tones, and personal preferences. With the proper\\n application techniques, Pure Anada mineral cosmetics can be used by all\\n women! Mature skin types enjoy the light, luminous texture, while \\nproblematic skin types take advantage of the full, soothing coverage. \\nThese products are concentrated; a little goes a long way!  This makes \\nPure Anada very affordable. We want The mineral ingredients in \\nPure Anada have properties that are beneficial to your skin! For \\nexample: Titanium Dioxide reflects the sun’s harsh rays away from your \\nskin. Zinc Oxide soothes irritation, and Silica blurs fine lines and \\nwrinkles.Shade Range: Ingredients: Mica, Titanium Dioxide, Zinc Oxide, Silica, Boron Nitride, Iron Oxides, Ultramarines Note: Deeper, global foundation shades do not contain Titanium Dioxide.Brush not included",
    category: "mineral",
    product_type: "foundation",
    product_tag: "Natural"
}
```

_Response (201 - CREATED)_

```
{
    "id": <generate from system>,
    "brand": "pure anada",
    "name": "Pure Anada Loose mineral foundation",
    "description": "Pure Anada mineral foundation has the ability to provide full coverage, \\nwhile still feeling light and natural. No more silicone based \\nfoundations that can stifle your pores. With Pure Anada your skin can \\n“breathe”. This results in a healthier, younger looking complexion.You\\n can be assured that when you use Pure Anada, you are using a truly \\nnatural product. Pure Anada has done the research, and are committed to \\nusing the safest, purest ingredients available. It is not necessary to \\nadd preservatives to this loose mineral products. The raw minerals used \\nin Pure Anada are inert, and do not support the growth of bacteria, mold\\n or fungi.Pure Ananda boasts an extensive array of mineral \\ncolors to suit all skin tones, and personal preferences. With the proper\\n application techniques, Pure Anada mineral cosmetics can be used by all\\n women! Mature skin types enjoy the light, luminous texture, while \\nproblematic skin types take advantage of the full, soothing coverage. \\nThese products are concentrated; a little goes a long way!  This makes \\nPure Anada very affordable. We want The mineral ingredients in \\nPure Anada have properties that are beneficial to your skin! For \\nexample: Titanium Dioxide reflects the sun’s harsh rays away from your \\nskin. Zinc Oxide soothes irritation, and Silica blurs fine lines and \\nwrinkles.Shade Range: Ingredients: Mica, Titanium Dioxide, Zinc Oxide, Silica, Boron Nitride, Iron Oxides, Ultramarines Note: Deeper, global foundation shades do not contain Titanium Dioxide.Brush not included",
    "category": "mineral",
    "product_type": "foundation",
    "product_tag": "Natural",
    "UserId": <current user id>,
    "updatedAt": "<generate from system>",
    "createdAt": "<generate from system>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: get All user make up list

### Description:

Method: GET

> ```
> http://localhost:3000/products/myList
> ```

### Headers

| Content-Type | Value                |
| ------------ | -------------------- |
| access_token | generate from system |

_Request Body_

```
{
    no needed
}
```

_Response (200 - OK)_

```
[
    {
        "id": <make up id>,
        "brand": "<make up brand>",
        "name": "<make up name>",
        "description": "<make up description>",
        "category": "<make up category>",
        "product_type": <make up type>",
        "product_tag": "<make up tag>",
        "UserId": <current user id>,
        "createdAt": "<generate from system>",
        "updatedAt": "<generate from system>"
    },

    {
        "id": <make up id>,
        "brand": "<make up brand>",
        "name": "<make up name>",
        "description": "<make up description>",
        "category": "<make up category>",
        "product_type": <make up type>",
        "product_tag": "<make up tag>",
        "UserId": <current user id>,
        "createdAt": "<generate from system>",
        "updatedAt": "<generate from system>"
    },
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: send make up list to user email

### Description:

Method: GET

> ```
> http://localhost:3000/products/sendList
> ```

### Headers

| Content-Type | Value                |
| ------------ | -------------------- |
| access_token | generate from system |

_Request Body_

```
{
    no needed
}
```

_Response (200 - OK)_

```
{
    message: "email already sent to user !"
}
```

_Response (404 - Not Found)_

```
{
  "message": "you have nothing on your list"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## End-point: delete user make up list

### Description:

Method: DELETE

> ```
> http://localhost:3000/products/:id/myList
> ```

### Headers

| Content-Type | Value                |
| ------------ | -------------------- |
| access_token | generate from system |

_Request Body_

```
not needed
```

_Request Params_

```
{
  "id": "product id"
}
```

_Response (200 - OK)_

```
{
  message: "data successfully deleted"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "internal server error"
}
```
