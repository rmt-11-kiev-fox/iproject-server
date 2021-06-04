# iproject-server
API server for Individual Project

# ecommerce-server
Ecommerce API 

## E-Commerce Project API Documentation
heres my REST API :

_User Routes_

```
userRoutes.post('/register')
userRoutes.post('/login')
userRoutes.post('/googleLogin')

```
_Product Routes_

```
//can both side
productRoute.get('/')
productRoute.get('/products/:id')  

// customer side
productRoute.get('/like', authentication)
productRoute.post('/like', authentication)
productRoute.post('/addBid', authentication)
productRoute.get('/history', authentication)
productRoute.get('/bidList', authentication)
productRoute.patch('/products/:id', authentication)

// admin side
productRoute.post('/products', authentication, authorization) 
productRoute.put('/products/:id', authentication, authorization)
productRoute.delete('/products/:id', authentication, authorization)
```

### Product Route
---------------------------------------
> GET "/"

> _Fetch Products_


_Request Header_

```
{
  not_needed
}
```

_Request Body_
```
not needed

```
_Response (200)_

```
[
  product: {
              "id": <from_db>,
              "title": <from_db>,
              "artist": <from_db>,
              "image_url": <from_db>,
              "description": <from_db>,
              "status": <from_db>,
              "category_id": <from_db>,
              "startBid": <from_db>,
              "endBid": <from_db>
              "createdAt": "2020-03-20T07:15:12.149Z",
              "updatedAt": "2020-03-20T07:15:12.149Z",
            }
]
```
_Response (500 - Default Error)_
```
{
  "message": <from_error_handler>
}
```

> POST / products

> _Create  Product_

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": <from_input>,
  "title": <from_input>,
  "artist": <from_input>,
  "image_url": <from_input>,
  "description": <from_input>,
  "status": <from_input>,
  "category_id": <from_input>,
  "startBid": <from_input>,
  "endBid": <from_input>
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```
_Response (201 - created)_

```

  {
    "id": <from_db>,
    "title": <from_db>,
    "artist": <from_db>,
    "image_url": <from_db>,
    "description": <from_db>,
    "status": <from_db>,
    "category_id": <from_db>,
    "startBid": <from_db>,
    "endBid": <from_db>
  }
```
_Response (400 - Bad request)_
```
{
  "message": "<error_handler>"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "<error_handler>"
}
```

> GET / products/:id

> _Find Product By Id_

_Request Header_
```
{
  no needed
}
```
_Request Body_
```
{
  no needed
}
```

_Response (200 - OK)_
```

  {
    "id": <from_db>,
    "title": <from_db>,
    "artist": <from_db>,
    "image_url": <from_db>,
    "description": <from_db>,
    "status": <from_db>,
    "category_id": <from_db>,
    "startBid": <from_db>,
    "endBid": <from_db>
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }

```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "invalid server error"
}
```

> PUT / tasks/:id

> Edit Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "id": <from_input>,
  "title": <from_input>,
  "artist": <from_input>,
  "image_url": <from_input>,
  "description": <from_input>,
  "status": <from_input>,
  "category_id": <from_input>,
  "startBid": <from_input>,
  "endBid": <from_input>
}
```

_Response (201 - Created)_
```
{
  "id": <from_db>,
  "title": <from_db>,
  "artist": <from_db>,
  "image_url": <from_db>,
  "description": <from_db>,
  "status": <from_db>,
  "category_id": <from_db>,
  "startBid": <from_db>,
  "endBid": <from_db>
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "invalid server error"
}
```

> DELETE /products/:id

> Delete by id

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
_Response (200)_
```
{
  message: success delete
}
```
_Response (404 - Bad Request)_
```
{
  "errors":"<errors_name>"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "invalid server error"
}
```
> GET "/like"

> _Fetch like_


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
_Response (200)_

```
[
  {
    "id": <from_db>,
    "product_id": <from_db>,
    "user_id": <from_db>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }          
]
```
_Response (500 - Default Error)_
```
{
  "message": <from_error_handler>
}
```

> POST "/addBid"

> _Create Bid_


_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    
    "product_id": <from_req>,
    "user_id": <from_user_login>,
    "money_offer": <from_input>

}   

```
_Response (201)_

```
{
  <massage_succed>
}
```
_Response (500 - Default Error)_
```
{
  "message": <from_error_handler>
}

```

> POST "/like"

> _Create like_


_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    
    "product_id": <from_req>,
    "user_id": <from_user_login>,

}   

```
_Response (200)_

```
[
  {
    "id": <from_db>,
    "product_id": <from_db>,
    "user_id": <from_db>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }          
]
```
_Response (500 - Default Error)_
```
{
  "message": <from_error_handler>
}

```

### User Route
----------------------------------


> POST / register

>_Regist User_

_Request Header_

```
{
  no needed
}
```
_Request Body_
```
{
  email: <input email>
  password: <input password>
  fullname: <input email>
  address: <input password>
}

```
_Response (201 - created)_
```
{
  id: <given id by system>
  email: <posted email>
  password: <posted password>
  fullname: <posted password>
}
```
_Response (400)_
```
{
  "errors":"<errors_name>"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "invalid server error"
}
```


> POST / login

> Login User

_Request Header_

```
{
  no needed
}
```
_Request Body_
```
{
email: <input email>
password: <input password>
}
```
_Response (200 - created)_
```
{
  access_token: <Your access_token>
}
```
_Response (404)_
```
{
  "errors":"<errors_name>"
}
```
_Response (400)_
```
{
  "errors":"<errors_name>"
}
```
_Response (500 - Invalid Server Error)_
```
{
  "message": "invalid server error"
}
```

> POST / googleLogin

> Login User

_Request Header_

```
<verify_by_google>

```