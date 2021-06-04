// Charitable //

## endpoint List
>User
```
  POST/register
  POST/login
  GET/profile
  PUT/profile
```

>Charity
```
  GET/categories
  GET/categories/:id
  GET/search
  GET/organization/:id
```
>Checkout
```
  GET/checkout/success
  POST/checkout
  GET/products/:id
  post/products
```
>Donation
```
GET/donation
POST/donation
```

## POST /register
>register a new user

_Request Header_
```
not needed
```
_Request Body_
```
{
  "username": "<user username>",
  "email":"<user email>",
  "password": "<user password>",
  "fistName":"<user firstName>",
  "lastName":"<user lastName>",
  "phoneNumber":"<user phoneNumber>",
  "address":"<user address>",
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "username": "<posted username>",
  "email":"<posted email>",
  "firstName": "<posted firstName>",
  "lastName":"<posted lastName>",
  "address":"<posted address>",
  "phoneNumber":"<posted phoneNumber>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - SequelizeValidationError)_
```
{
    "message": [
        "Username is required",
        "Last Name is required"
        "First Name is required"
        "Please enter a valid email address",
        "Email is Required",
        "Password is required",
        "Address is required"
        "Phone Number is required"
    ]
}
```

## POST /login
>login Customer

_Request Header_
```
not needed
```
_Request Body_
```
{
  "username": "<user username>",
  "password": "<user password>",
}
```
_Response (200 - OK)_
```
{
  "id": "<id given by system>",
  "email" : "<posted email>"
  "token" : "<generated jwt string>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
_Response (404 - Not Found)_
```
{
  "message": "User Not Found"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid Credentials"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request"
}
```


## GET /categories

> Get all categories

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
      "categoryId": "A",
      "categoryDesc": "Arts, Culture and Humanities"
    },
    {
      "categoryId": "B",
      "categoryDesc": "Educational Institutions and Related Activities"
    },
    {
      "categoryId": "C",
      "categoryDesc": "Environmental Quality, Protection and Beautification"
    },
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
_Response (404 - Not Found)_
```
{
  "message": No Results Found
}
```

_Response (403 - Unauthorized)_
```
{
  "message": "unauthorized"
}
```



## GET /categories/:id
> List Organization by category id

_Request Header_
```
not needed
```
_Request Body_
```
not needed
```
_Request Params_
```
{
  "id": "<category_id>"
}
```

_Response (201 - Created)_
```
 {
      "ein": "208891982",
      "charityName": "OZARK HAVEN RESCUE",
      "url": "http://www.orghunter.com/organization/208891982",
      "donationUrl": "http://donate.makemydonation.org/donate/208891982",
      "city": "CABOOL",
      "state": "Missouri",
      "zipCode": "65689-0383",
      "start": 0,
      "rows": 20,
      "recordCount": 39122,
      "score": 1,
      "acceptingDonations": 1,
      "category": "Animal-Related",
      "eligibleCd": 1,
      "deductibilityCd": 1,
      "statusCd": 1,
      "website": "",
      "missionStatement": "",
      "parent_ein": 1,
      "longitude": "-92.101265",
      "latitude": "37.123940"
    },
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (403 - Unauthorized)_
```
{
  "message": "unauthorized"
}
```
_Response (404 - Not Found)_
```
{
  "message": No Results Found
}
```


## GET /search
> Update a product by the provided id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
   {
      "ein": "721336135",
      "charityName": "NEW COMMUNITY HOPE",
      "url": "http://www.orghunter.com/organization/721336135",
      "donationUrl": "http://donate.makemydonation.org/donate/721336135",
      "city": "GULFPORT",
      "state": "Mississippi",
      "zipCode": "39501-4438",
      "start": 0,
      "rows": 20,
      "recordCount": 2589781,
      "score": 1,
      "acceptingDonations": 1,
      "category": "Religion-Related, Spiritual Development",
      "eligibleCd": 1,
      "deductibilityCd": 1,
      "statusCd": 1,
      "website": "",
      "missionStatement": "",
      "parent_ein": 1,
      "longitude": "-89.100052",
      "latitude": "30.378584"
    },
    {
      "ein": "540839614",
      "charityName": "ALEXANDRIA CENTER FOR EMPLOYMENT",
      "url": "http://www.orghunter.com/organization/540839614",
      "donationUrl": "http://donate.makemydonation.org/donate/540839614",
      "city": "ALEXANDRIA",
      "state": "Virginia",
      "zipCode": "22314-2535",
      "start": 0,
      "rows": 20,
      "recordCount": 2589781,
      "score": 1,
      "acceptingDonations": 0,
      "category": "Not Provided",
      "eligibleCd": 0,
      "deductibilityCd": 0,
      "statusCd": 4,
      "website": "",
      "missionStatement": "",
      "parent_ein": 1,
      "longitude": "-77.046783",
      "latitude": "38.807755"
    },
    {
      "ein": "010352636",
      "charityName": "THROUGH THESE DOORS",
      "url": "http://www.orghunter.com/organization/010352636",
      "donationUrl": "http://donate.makemydonation.org/donate/010352636",
      "city": "PORTLAND",
      "state": "Maine",
      "zipCode": "04104-0704",
      "start": 0,
      "rows": 20,
      "recordCount": 2589781,
      "score": 1,
      "acceptingDonations": 1,
      "category": "Human Services - Multipurpose and Other",
      "eligibleCd": 1,
      "deductibilityCd": 1,
      "statusCd": 1,
      "website": "www.familycrisis.org",
      "missionStatement": "Domestic violence resource center offering safe and accessible services to victims 24 hotline, emergency shelter, outreach and court advocacy, school education and prevention.",
      "parent_ein": 1,
      "longitude": "-70.269997",
      "latitude": "43.660000"
    },
```


_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (403 - Unauthorized)_
```
{
  "message": "unauthorized"
}
```
_Response (404 - Not Found)_
```
{
  "message": No Results Found
}
```


## GET /organization/:id
> fetch the organization by the provided id

_Request Header_
```
not needed
```

_Request Params_
```
{
  "id": "<organization_id>"
}
```

_Response (200 - OK)_
```
 {
    "ein": "351430561",
    "name": "AMERICAN FEDERATION OF STATE COUNTY & MUNICIPAL EMPLOYEES",
    "inCareOfName": "MABEL MANGUM",
    "street": "11080 N STATE ROAD 1 LOT 3",
    "city": "OSSIAN",
    "state": "IN",
    "zipCode": "46777-9734",
    "country": "USA",
    "groupExemption": "AMERICAN FEDERATION OF STATE COUNTY & MUNICIPAL EMPLOYEES",
    "subsection": "501(c)(5)",
    "classification": "Labor Organization",
    "affiliation": "Subordinate - This code is used if the organization is a subordinate in a group ruling.",
    "rullingDate": "January, 1950",
    "deductibility": "Contributions are not deductible.",
    "deductibilityStatus": null,
    "foundation": "All organizations except 501(c)(3)",
    "activity1": "Association of employees",
    "activity2": "Other school related activities",
    "activity3": "Employee or member welfare association",
    "organization": "Association",
    "exemptStatus": "Unconditional Exemption",
    "taxPeriod": "December, 2019",
    "assetCodeDesc": "0",
    "incomeCodeDesc": "0",
    "filingRequirementCodeDesc ": "Not required to file (income less than $25,000)",
    "pfFilingRequirementCodeDesc": "No PF return",
    "accountingPeriod": "December",
    "assetAmount": "0.00",
    "incomeAmount": "0.00",
    "form990": "0.00",
    "nteeCd": "?",
    "nteeClass": "Not Provided",
    "nteeType": "Not Provided",
    "sortName": "L0561IN FT WAYNE SCHOOL EMP",
    "revocationDt": null,
    "revPostingDt": null,
    "irsRevocationStatus": null,
    "acceptingDonations": "0"
  }
```


_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (403 - Unauthorized)_
```
{
  "message": "unauthorized"
}
```
_Response (404 - Not Found)_
```
{
  "message": No Results Found
}
```




## GET /checkout
> Payment process to Stripe
> 
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```{
  "productId": "<product id>",
  "priceId": "<price id>",
  "custId": "<customer id>",
  "recurring" : "<price recurring>"
}
```

_Response (200 - OK)_
```
{
  id: 'prod_JbJszGaVeTjLcJ',
  object: 'product',
  active: true,
  attributes: [],
  created: 1622690952,
  description: null,
  images: [],
  livemode: false,
  metadata: {},
  name: 'OK PROGRAM OF KANSAS CITY KANSAS INC',
  package_dimensions: null,
  shippable: null,
  statement_descriptor: null,
  type: 'service',
  unit_label: null,
  updated: 1622690952,
  url: null
}

```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## GET /checkout/success

> Get checkout session

_Request Header_
```
not needed
```
_Request Body_
```
not needed
```

_Request Query_
```
"id":"<session_id>"
```
_Response (200 - OK)_
```
{
      "id": "li_1Iy7WFBNLCONpnH95TYOJ04n",
      "object": "item",
      "amount_subtotal": 0,
      "amount_total": 0,
      "currency": "myr",
      "description": "Gold Special",
      "price": {
        "id": "price_HKLqpzEVvuOMSd",
        "object": "price",
        "active": true,
        "billing_scheme": "per_unit",
        "created": 1590178001,
        "currency": "myr",
        "livemode": false,
        "lookup_key": null,
        "metadata": {},
        "nickname": null,
        "product": "prod_HKLqf62Hq74Nzw",
        "recurring": null,
        "tiers_mode": null,
        "transform_quantity": null,
        "type": "one_time",
        "unit_amount": 1000,
        "unit_amount_decimal": "1000"
      },
      "quantity": 1
    },
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Not Authorized"
}
```


## POST/products
> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  {
    "name": "<product name>",
    "interval":"<product interval>",
    "subscription": "<product subscription>",
    "amount":"<product_amount>"
  }
```

_Response (201 - Created)_
```
{
  "productId": "<posted product id>",
  "priceId": "<posted price id>",
  "custId": "<posted customer id>",
  "recurring" : "<posted price recurring>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Not Authorized"
}
```


## GET /products/:id
> get product details by the given id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{
  "id": "<product id>"
}
```


_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": "prod_JbK5Q3vqAltCWG",
  "object": "product",
  "active": true,
  "created": 1622691730,
  "description": null,
  "images": [],
  "livemode": false,
  "metadata": {},
  "name": "SILVERTON FAMILY LEARNING CENTER INC",
  "package_dimensions": null,
  "shippable": null,
  "statement_descriptor": null,
  "unit_label": null,
  "updated": 1622691730,
  "url": null
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Not Authorized"
}
```




## GET /donation/
> get donation history
> 
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


_Response (200 - OK)_
```
{
  "UserId": 12
  "organizationName": "DEMING CRIME STOPPERS PROGRAM",
  "amount": 1000.0,
  "paymentType":"One-Time"
  "createdAt":"2021-06-02 14:10:16"
  "updatedAt": "2021-06-02 14:10:16"

}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Not Authorized"
}
```


## POST /donation/
> create donation log
> 
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "UserId": 12
  "organizationName":"DEMING CRIME STOPPERS PROGRAM",
  "amount": 1000.0,
  "paymentType":"One-Time"
}
```


_Response (200 - OK)_
```
{
  "UserId": 12
  "organizationName": "DEMING CRIME STOPPERS PROGRAM",
  "amount": 1000.0,
  "paymentType":"One-Time"
  "createdAt":"2021-06-02 14:10:16"
  "updatedAt": "2021-06-02 14:10:16"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Not Authorized"
}
```
