# E-Commerce
E-commerce is a web-app where user can purchase variety of goods 

# RESTful Endpoints

USER
```
POST/users/register
POST/users/loginAdmin
```
GAME
```
POST/games/start
PUT/games/updateScore
POST/games/gameStats
```
Question
```
POST/question/getQuestion
PUT/question/answerQuestion
```
Quote
```
GET/quote/getQuote
```
Stats
```
GET/stats/
GET/stats/mostPlayed
GET/stats/leaderboard
```

## POST /users/loginAdmin

```
Login for CMS Admin
```

_Request Header_
```
not needed
```
_Request Body_
```
{
    "email":"<email to get insert into>",
    "password":"<password to get insert into>"
}
```
_Response (200)_
```
{
  "access_token" : access_token
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email and password are required"
}

```
_Response (403 - Forbidden)_
```
{
  "message": "Invalid email/password"
}
```
_Response (404 - Resource Not Found)_
```
{
  "message": "Invalid email/password"
}
```
_Response (500 - Internal server error)
```
{
  "message": "Internal server error"
}
```
## GET /products/

```
GET All Product
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Response (200)_
```
[
    {
        "id": 1,
        "name": "Minuman",
        "image_url": "",
        "price": 4000,
        "stock": 100,
        "Category_ID": 2,
        "createdAt": "2021-05-24T18:28:18.039Z",
        "updatedAt": "2021-05-24T21:49:09.646Z"
    },
    {
        "id": 2,
        "name": "Minuman",
        "image_url": "",
        "price": 10000,
        "stock": 1000,
        "Category_ID": 2,
        "createdAt": "2021-05-24T22:12:58.075Z",
        "updatedAt": "2021-05-24T22:12:58.075Z"
    }
]
```

_Response (500 - Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```

## GET /products/:id

```
GET  Product
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Params_
```
req.params = <id to put update into>

```


_Response (200)_
```
[
    {
        "id": 1,
        "name": "Minuman",
        "image_url": "",
        "price": 4000,
        "stock": 100,
        "Category_ID": 2,
        "createdAt": "2021-05-24T18:28:18.039Z",
        "updatedAt": "2021-05-24T21:49:09.646Z"
    },
    {
        "id": 2,
        "name": "Minuman",
        "image_url": "",
        "price": 10000,
        "stock": 1000,
        "Category_ID": 2,
        "createdAt": "2021-05-24T22:12:58.075Z",
        "updatedAt": "2021-05-24T22:12:58.075Z"
    }
]
```

_Response (500 - Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```

## POST /products/

```
POST product
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Body_
```
{
    "name": <"title to get insert into">,
    "image_url": <"status to get insert into">,
    "price": <"price to get insert into">,
    "stock": <"stock to get insert into">,
    "Category_Id: <"Category_ID to get insert into">
}
```
_Response (201)_
```
{
    "message": "Product Created",
    "data": {
        "id": <given id>,
        "name": <posted name>,
        "image_url": <posted image_url>,
        "price": <posted price>,
        "stock": <posted stock>,
        "Category_ID": <posted Category_ID>,
    }
}
```
_Response(400 - Bad Request/ Sequelize Validation Error)_
```
[
    "Name is required",
    "Validation min on price failed", 
    "Validation min on stock failed",
    "Price must be a number",
    "Stock must be a number"
]
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## PUT /products/:id

```
GET product
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Params_
```
req.params = <id to put update into>

```
_Request Body_
```
{
    "name": <"title to get insert into">,
    "image_url": <"status to get insert into">,
    "price": <"price to get insert into">,
    "stock": <"stock to get insert into">,
    "Category_Id: <"Category_ID to get insert into">
}
```
_Response (200)_
```
{
    "message": "Product Product Edited",
    "data": {
        "id": <given id>,
        "name": <posted name>,
        "image_url": <posted image_url>,
        "price": <posted price>,
        "stock": <posted stock>,
        "Category_ID": <posted Category_ID>,
    }
}
```
_Response(400 - Bad Request/ Sequelize Validation Error)_
```
[
    "Name is required",
    "Validation min on price failed", 
    "Validation min on stock failed",
    "Price must be a number",
    "Stock must be a number"
]
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## PATCH /products/:id

```
Add/reduce product
```
_Request Params_
```
req.params = <id to put update into>

```
_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Body_
```
{
    "stock": <"stock to get insert into">,
}
```
_Response (200)_
```
{
    "message": "Product Product Edited",
    "data": {
        "id": <given id>,
        "name": <posted name>,
        "image_url": <posted image_url>,
        "price": <posted price>,
        "stock": <posted stock>,
        "Category_ID": <posted Category_ID>,
    }
}
```
_Response(400 - Bad Request/ Sequelize Validation Error)_
```
[
    "Name is required",
    "Validation min on price failed", 
    "Validation min on stock failed",
    "Price must be a number",
    "Stock must be a number"
]
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## DELETE /products/:id

```
DELETE product
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Params_
```
req.params = <id to put update into>

```
_Response (200)_
```
{
    "message": "Product Deleted"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## POST /customer/login

```
Login for Customer
```

_Request Header_
```
not needed
```
_Request Body_
```
{
    "email":"<email to get insert into>",
    "password":"<password to get insert into>"
}
```
_Response (200)_
```
{
  "access_token" : access_token
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email and password are required"
}

```
_Response (403 - Forbidden)_
```
{
  "message": "Invalid email/password"
}
```
_Response (404 - Resource Not Found)_
```
{
  "message": "Invalid email/password"
}
```
_Response (500 - Internal server error)
```
{
  "message": "Internal server error"
}
```
## POST /customer/register

```
Register for Customer
```

_Request Header_
```
not needed
```
_Request Body_
```
{
    "email":"<email to get insert into>",
    "password":"<password to get insert into>"
}
```
_Response (200)_
```
{
{
    "message": "User created",
    "status-code": 201,
    "data": {
        "id": <given id>,
        "email": <posted email>,
        "role": <posted role>
    }
}
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email and password are required"
}

```
_Response (500 - Internal server error)
```
{
  "message": "Internal server error"
}
```

## GET /cart/

```
GET All cart
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Response (200)_
```
[
    {
        "UserId":1,
        "ProductId":1,
        "Quantity":3
    },
    {
        "UserId":1,
        "ProductId":2,
        "Quantity":3
    }
]
```

_Response (500 - Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```

## POST /cart/

```
POST cart
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Body_
```
{
    "UserId":<"UserId to get insert into">,
    "ProductId":<"ProductId to get insert into">,
    "Quantity":<"Quantity to get insert into">
}
```
_Response (201)_
```
{
    "message": "Product added",
    "data": {
        "id": <given id>,
        "UserId": <posted UserId>,
        "ProdutId": <posted ProductId>,
        "Quantity": <posted Quantity>
    }
}
```
_Response (200)_
```
{
    "message": "Cart items edited",
    "data": {
        "id": <given id>,
        "UserId": <posted UserId>,
        "ProdutId": <posted ProductId>,
        "Quantity": <posted Quantity>
    }
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## PUT /cart/:id

```
Update cart items
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Params_
```
req.params = <id to put update into>

```
_Request Body_
```
{
    "UserId":<"UserId to get insert into">,
    "ProductId":<"ProductId to get insert into">,
    "Quantity":<"Quantity to get insert into">
}
```
_Response (200)_
```
{
    "message": "Cart items edited",
    "data": {
        "id": <given id>,
        "UserId": <posted UserId>,
        "ProdutId": <posted ProductId>,
        "Quantity": <posted Quantity>
    }
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## DELETE /cart/:id

```
DELETE cart
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Request Params_
```
req.params = <id to put update into>

```
_Response (200)_
```
{
    "message": "Cart Items deleted"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
## POST /cartOrder

```
Finalize Cart
by adding cart item to order item compiled into transaction History
then deleted cart item
```

_Request Header_
```
{
    "access_token":"<your access token>"
}
```
_Response (200)_
```
{
    "message": "Transaction recorded",
    "transactionData":{
        "id":<given id>,
        "UserId":<posted UserId>,
        "totalHarga":<posted totalHarga>
    }
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Login First"
}
```
_Response (403 - Forbidden)_
```
{
    "message": "Role not authorized to access data"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```