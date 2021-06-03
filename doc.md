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
    "username":"kevin",
    "password":"phmrakna"
}
```

### _Response (200)_

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJrZXZpbiIsImlhdCI6MTYyMjY4OTY0Nn0.sVqW-q-AQEKkxV-7Mb7Dbvf94bvEgrsiHd5j9MaQzHc",
    "username": "kevin",
    "image": "",
    "role": "buyer"
}
```

### _Error (400 - Bad Request)_

Validation :

```
{
    "errors": {
        "name": "Login Failed",
        "status": 400,
        "message": "invalid password or email"
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Login Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 3. GET /all-product

### _Request Header_

```
{
    access_token: <string>
}
```

### \_Request Query

```
{
    size: 2,
    page: 1
}
```

### _Request Body_

```
none
```

### _Response (200)_

```
{
    "count": 3,
    "cards": [
        {
            "id": 2,
            "name": "test",
            "ob": 2,
            "bid": 10000,
            "winner": null,
            "status": true,
            "currentBid": 2,
            "bin": 33,
            "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622684905/xozmm6nvvcwq3eunf6f3.jpg",
            "category": "other",
            "dueDate": 86400,
            "UserId": 1,
            "createdAt": "2021-06-03T01:48:29.250Z",
            "updatedAt": "2021-06-03T01:48:29.250Z"
        },
        {
            "id": 3,
            "name": "we",
            "ob": 2,
            "bid": 50000,
            "winner": null,
            "status": true,
            "currentBid": 2,
            "bin": 3,
            "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622685626/otijrhxil4nk2wdgxwlo.jpg",
            "category": "pakaian",
            "dueDate": 86400,
            "UserId": 1,
            "createdAt": "2021-06-03T02:00:30.657Z",
            "updatedAt": "2021-06-03T02:00:30.657Z"
        }
    ]
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Get Product Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 4. POST /products

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
none
```

### _Request Body_

```
none
```

### _Response (200)_

```
[
    {
        "id": 2,
        "name": "test",
        "ob": 2,
        "bid": 10000,
        "winner": null,
        "status": true,
        "currentBid": 2,
        "bin": 33,
        "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622684905/xozmm6nvvcwq3eunf6f3.jpg",
        "category": "other",
        "dueDate": 86400,
        "UserId": 1,
        "createdAt": "2021-06-03T01:48:29.250Z",
        "updatedAt": "2021-06-03T01:48:29.250Z"
    },
    {
        "id": 3,
        "name": "we",
        "ob": 2,
        "bid": 50000,
        "winner": null,
        "status": true,
        "currentBid": 2,
        "bin": 3,
        "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622685626/otijrhxil4nk2wdgxwlo.jpg",
        "category": "pakaian",
        "dueDate": 86400,
        "UserId": 1,
        "createdAt": "2021-06-03T02:00:30.657Z",
        "updatedAt": "2021-06-03T02:00:30.657Z"
    },
    {
        "id": 5,
        "name": "e",
        "ob": 2,
        "bid": 10000,
        "winner": null,
        "status": true,
        "currentBid": 2,
        "bin": 3,
        "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622685994/dnb3no7oxukw9zatkk4b.jpg",
        "category": "other",
        "dueDate": 30,
        "UserId": 1,
        "createdAt": "2021-06-03T02:06:38.119Z",
        "updatedAt": "2021-06-03T02:06:38.119Z"
    }
]
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Get Product Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 5. POST /products

### _Request Header_

```
{
    access_token: <string>
}

```

### _Request Params_

```
none
```

### _Request Body_

```
{
     "dueDate":2,
      "bin":2,
      "bid":2,
      "currentBid": 2,
      "ob":2,
      "image":"sepatu",
      "name":"sepatu",
      "category":"sepatu",
      "status": true,
      "UserId": 1
}
```

### _Response (200)_

```
{
    "id": 6,
    "dueDate": 2,
    "bin": 2,
    "bid": 2,
    "currentBid": 2,
    "ob": 2,
    "image": "sepatu",
    "name": "sepatu",
    "category": "sepatu",
    "status": true,
    "UserId": 1,
    "updatedAt": "2021-06-03T03:18:39.175Z",
    "createdAt": "2021-06-03T03:18:39.175Z",
    "winner": null
}
```

### _Error (400 - Bad Request)_

```
{
    "errors": {
        "name": "Create Product Failed",
        "status": 400,
        "message": [
            "Name is required",
            "Ob is required",
            "Bid is required",
            "currentBid is required",
            "Bin is required",
            "Image is required",
            "Category is required",
            "Due Date is required"
        ]
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Create Product Error",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 6. POST /products/:id

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
{
    id: 2
}
```

### _Request Body_

```
none
```

### _Response (200)_

```
{
    "id": 2,
    "name": "test",
    "ob": 2,
    "bid": 10000,
    "winner": null,
    "status": true,
    "currentBid": 2,
    "bin": 33,
    "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622684905/xozmm6nvvcwq3eunf6f3.jpg",
    "category": "other",
    "dueDate": 86400,
    "UserId": 1,
    "createdAt": "2021-06-03T01:48:29.250Z",
    "updatedAt": "2021-06-03T01:48:29.250Z"
}
```

### _Error (404- Bad Request)_

```
{
    "errors": {
        "name": "Get One Product Failed",
        "status": 404,
        "message": "Data Not Found"
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Get One Product Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### 7. PATCH /products/:id

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
{
    id: 2
}
```

### _Request Body_

```
{
    status:false
}
```

### _Response (200)_

```
{
    "id": 2,
    "name": "test",
    "ob": 2,
    "bid": 10000,
    "winner": null,
    "status": false,
    "currentBid": 2,
    "bin": 33,
    "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622684905/xozmm6nvvcwq3eunf6f3.jpg",
    "category": "other",
    "dueDate": 86400,
    "UserId": 1,
    "createdAt": "2021-06-03T01:48:29.250Z",
    "updatedAt": "2021-06-03T01:48:29.250Z"
}
```

### _Error (400 - Bad Request)_

```
{
    "errors": {
        "name": "Update Product Failed",
        "status": 404,
        "message": "Product not found"
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Update Product Failed"",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### DELETE /products/:id

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
{
    id: 2
}
```

### _Request Body_

```
none
```

### _Response (200)_

```
{
    "message": "Product success to delete"
}
```

### _Error (404)_

```
{
    "message": "Data Not Found"
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Delete Product Failed",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### PUT /products/:id

### _Request Header_

```
{
    access_token: <string>
}

```

### _Request Params_

```
{
    id: params
}
```

### _Request Body_

```
{
     "dueDate":2,
      "bin":2,
      "bid":2,
      "currentBid": 2,
      "ob":2,
      "image":"sepatu",
      "name":"sepatu",
      "category":"sepatu",
      "status": true,
      "UserId": 1
}
```

### _Response (200)_

```
{
    "id": 6,
    "dueDate": 2,
    "bin": 2,
    "bid": 2,
    "currentBid": 2,
    "ob": 2,
    "image": "sepatu",
    "name": "sepatu",
    "category": "sepatu",
    "status": true,
    "UserId": 1,
    "updatedAt": "2021-06-03T03:18:39.175Z",
    "createdAt": "2021-06-03T03:18:39.175Z",
    "winner": null
}
```

### _Error (400 - Bad Request)_

```
{
    "errors": {
        "name": "Create Product Failed",
        "status": 400,
        "message": [
            "Name is required",
            "Ob is required",
            "Bid is required",
            "currentBid is required",
            "Bin is required",
            "Image is required",
            "Category is required",
            "Due Date is required"
        ]
    }
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Update Product Error",
        "status": 500,
        "message": "Internal Server Error"
    }
}
```

### POST /auctions

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
none
```

### _Request Body_

```
{
    ProductId: 2,
    price: 3
}
```

### _Response (201)_

```
{
    "id": 3,
    "ProductId": 2,
    "UserId": 1,
    "price": 3,
    "username": "seller",
    "updatedAt": "2021-06-03T03:32:19.994Z",
    "createdAt": "2021-06-03T03:32:19.994Z"
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Create Auction Failed",
        "code": 500,
        "message": "Internal Server Error"
    }
}
```

### GET /auctions/:id

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
{
    productId: 2
}
```

### \_Request Query

```
{
    size: 3
}
```

### _Response (200)_

```
[
    {
        "id": 3,
        "username": "seller",
        "price": 3,
        "ProductId": 2,
        "UserId": 1,
        "createdAt": "2021-06-03T03:32:19.994Z",
        "updatedAt": "2021-06-03T03:32:19.994Z"
    }
]
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        "name": "Get Auction Failed",
        "code": 500,
        "message": "Internal Server Error"
    }
}
```

### POST /history

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
none
```

### _Request Body_

```
{
  "sellerId":1,
   "price":1,
   "image":"ss",
    "name":"sss"
}
```

### _Response (200)_

```
{
    "name": "sss",
    "price": 1
}
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        name: "Create History Failed",
        code: 500,
        message: "Internal Server Error",
    }
}
```

### POST /history

### _Request Header_

```
{
    access_token: <string>
}
```

### \_Request Query

```
{
    role:"seller"
}
```

### _Response (200)_

```
[
    {
        "id": 1,
        "name": "weoijweijijow",
        "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622679982/w3jzycwm7dasmvtngceo.jpg",
        "price": 150023,
        "winnerId": 2,
        "winnerName": "pepa@mail",
        "sellerId": 1,
        "createdAt": "2021-06-03T00:26:59.553Z",
        "updatedAt": "2021-06-03T00:26:59.553Z"
    },
    {
        "id": 2,
        "name": "weoijweijijow",
        "image": "http://res.cloudinary.com/dfh39qfib/image/upload/v1622679982/w3jzycwm7dasmvtngceo.jpg",
        "price": 150023,
        "winnerId": 2,
        "winnerName": "pepa@mail",
        "sellerId": 1,
        "createdAt": "2021-06-03T00:53:11.340Z",
        "updatedAt": "2021-06-03T00:53:11.340Z"
    },
    {
        "id": 3,
        "name": "sss",
        "image": "ss",
        "price": 1,
        "winnerId": 1,
        "winnerName": "seller",
        "sellerId": 1,
        "createdAt": "2021-06-03T03:39:24.323Z",
        "updatedAt": "2021-06-03T03:39:24.323Z"
    }
]
```

### _Error (500 - Internal Server Error)_

```
{
    "errors": {
        name: "Get History Failed",
        code: 500,
        message: "Internal Server Error",
    }
}
```

### GET /ongkir/city

### _Request Header_

```
{
    access_token: <string>
}
```

### _Response (200)_

```
[
    {
        "city_id": "1",
        "province_id": "21",
        "province": "Nanggroe Aceh Darussalam (NAD)",
        "type": "Kabupaten",
        "city_name": "Aceh Barat",
        "postal_code": "23681"
    },
]
```

### _Error (500 - Internal Server Error)_

```
{
     msg: "internal server error"
}
```

### GET /ongkir/:userId

### _Request Header_

```
{
    access_token: <string>
}
```

### _Request Params_

```
{
    userId: 1
}
```

### \_Request Query

```
{
    courier: "pos"
    destination: 3
}
```

### _Response (200)_

```
{
  "code": "pos",
  "name": "POS Indonesia (POS)",
  "costs": [
    {
      "service": "Paket Kilat Khusus",
      "description": "Paket Kilat Khusus",
      "cost": [
        {
          "value": 142000,
          "etd": "6 HARI",
          "note": ""
        }
      ]
    }
  ]
}
```

### _Error (500 - Internal Server Error)_

```
{
   msg: "internal server error"
}
```
