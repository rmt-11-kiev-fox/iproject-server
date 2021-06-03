# GeeHive App Server

GeeHive App is a gift recommendation app.
This app has :

- RESTful endpoint for product's CRUD operation
- JSON formatted response

&nbsp;
​
List of available endpoints :

- `GET /result`
- `GET /exchangeRate`
- `POST /sendEmail`

---

### 1. GET /result

Description: Get data from server database based on user's input

_Request Body :_

```json
{
  "age_grpup": "string",
  "gender": "string",
  "interest": "string"
}
```

_Response (200)_ ​
​

```json
[
  {
    "name": "Product Name",
    "brand": "Product Brand",
    "price": "Product Price",
    "url": "https://www.amazon.com/productId",
    "imageurl": "https://images-na.ssl-images-amazon.com/images/I/productId.jpg",
    "rating": "Product Rating",
    "countRating": "Total rate"
  },
  {
    "name": "Product Name",
    "brand": "Product Brand",
    "price": "Product Price",
    "url": "https://www.amazon.com/productId",
    "imageurl": "https://images-na.ssl-images-amazon.com/images/I/productId.jpg",
    "rating": "Product Rating",
    "countRating": "Total rate"
  },
  ....
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Input invalid!"
}
```
---

### 2. GET /exchangeRate
Description: Get currency exchange rate USD to IDR from free.currencyconverterapi.com

_Requirement :_
- `API Key`


_Response (200)_ ​

```json
{
  "USD_IDR": "Exchange rate Value"
}
```

_Response (400)_ ​

```json
{
  "message": "Invalid API Key"
}
```
---

### 3. POST /sendEmail
Description: Sending email using _nodemailer_ with Google OAuth2 authentication

_Requirement :_
- `Email Client ID`
- `Email Client Secret`
- `Email Refresh Token`

_Response (201)_ ​

```json
{
  "message": "Email sent: Information response"
}
```

_Response (500)_ ​

```json
{
  "message": "Internal Server Error"
}
```