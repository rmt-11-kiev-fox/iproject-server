# Personal Expenses Assistant (PEA)
A simple expenses tracker app to monitor your budget

# ENDPOINTS
## 1. POST /register
Register your profile to use the App
### _Headers_
```
none
```
### _Body_
```
{
  username: <string>,
  password: <string>
}
```
### _Parameter_
```
none
```
### _Response (201) - Created_
```
{
  id: <integer>,
  username: <string>
}
```
### _Response (400) - Sequelize Validation Error_
```
{
  message: <validation error message>
}
```
### _Response (400) - Bad Request_
```
{
  message: "Bad Request"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 2. POST /login
Login to your profile
### _Headers_
```
none
```
### _Body_
```
{
  username: <string>,
  password: <string>
}
```
### _Parameter_
```
none
```
### _Response (200) - OK_
```
{
  access_token: <string>
}
```
### _Response (400) - Invalid username/password_
```
{
  message: "Invalid username/password"
}
```
### _Response (400) - Bad Request_
```
{
  message: "Bad Request"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```