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

## 3. POST /incomes
Add new source of Income
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  category: <string>,
  description: <string>,
  amount: <integer>,
  period: <string>
}
```
### _Parameter_
```
none
```
### _Response (201) - Created_
```
{
  message: "New income Rp <integer>,- from <string> - <string> has been added successfully!"
}
```
### _Response (400) - If amount is <= 0_
```
{
  message: "Amount can't be zero or less than zero!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 4. GET /incomes
Show source of Income within month
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  period: <string>
}
```
### _Parameter_
```
none
```
### _Response (200) - OK_
```
[
  {
    category: <string>,
    description: <string>,
    amount: <integer>,
    period: <string>
  },
  {
    category: <string>,
    description: <string>,
    amount: <integer>,
    period: <string>
  }
]
```
### _Response (400) - Haven't submit income_
```
{
  message: "You haven't submit any Income for this period!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 5. POST /expenses
Add new expenses
### _Headers_
```
{
  access_token: <string>
}
```
### _Body_
```
{
  category: <string>,
  description: <string>,
  amount: <integer>,
  period: <string>
}
```
### _Parameter_
```
none
```
### _Response (201) - Created_
```
{
  message: "New expenses Rp <integer>,- from <string> - <string> has been added successfully!"
}
```
### _Response (400) - Haven't submit income_
```
{
  message: "Please input your income first!"
}
```
### _Response (400) - Expenses higher than Income_
```
{
  message: "Your expense shouldn't be higher than your income!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 6. GET /expenses
Show all Expenses within month
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  period: <string>
}
```
### _Parameter_
```
none
```
### _Response (200) - OK_
```
[
  {
    category: <string>,
    description: <string>,
    amount: <integer>,
    period: <string>
  },
  {
    category: <string>,
    description: <string>,
    amount: <integer>,
    period: <string>
  }
]
```
### _Response (400) - Haven't submit expenses_
```
{
  message: "You haven't submit any Expenses for this period!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 7. GET /reports
Show report of particular month
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  period: <string>
}
```
### _Parameter_
```
none
```
### _Response (200) - OK_
```
{
  UserId: <integer>,
  total_income: <integer>,
  total_expenses: <integer>,
  balance: <integer>,
  period: <string>
}
```
### _Response (400) - Haven't submit expenses_
```
{
  message: "You haven't submit any Expenses for this period!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 8. PUT /incomes/:id
Edit particular source of income data
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  category: <string>,
  description: <string>
}
```
### _Parameter_
```
{
  id: <integer>
}
```
### _Response (200) - OK
```
{
  message: "Category and Description successfully updated!"
}
```
### _Response (401) - Unauthorized_
```
{
  message: "Unauthorized request!"
}
```
### _Response (404) - Not found_
```
{
  message: "Request not found!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 9. PATCH /incomes/:id
Update particular source of income data
### _Headers_
```
{
  access_token: < string >
}
```
### _Body_
```
{
  amount: <integer>
}
```
### _Parameter_
```
{
  id: <integer>
}
```
### _Response (200) - OK
```
{
  message: "Income amount successfully updated!"
}
```
### _Response (401) - Unauthorized_
```
{
  message: "Unauthorized request!"
}
```
### _Response (404) - Not found_
```
{
  message: "Request not found!"
}
```
### _Response (400) - Bad Request_
```
{
  message: <string>
}
```
### _Response (401) - If not logged in_
```
{
  message: "Please login!"
}
```
### _Response (401) - Invalid access token_
```
{
  message: "Invalid access token!"
}
```
### _Response (500) - Internal Server Error_
```
{
  message: "Internal Server Error"
}
```

## 14. GET /
Get Stocks Data
### _Headers_
```
{
  x-rapidapi-key: < API Key >,
  x-rapidapi-host: < API Host >
}
```
### _Body_
```
none
```
### _Parameter_
```
none
```
### _Response (200) - OK_
```
{
  explains; [],
  count: 15,
  quotes: [
    {
      exchange: "JKT",
      shortname: "Telkom Indonesia (Persero) Tbk.",
      quoteType: "EQUITY",
      symbol: "TLKM.JK",
      index: "quotes",
      score: 22634,
      typeDisp: "Equity",
      longname: "Perusahaan Perseroan (Persero) PT Telekomunikasi Indonesia Tbk",
      isYahooFinance: true
    },
    {
      exchange: "JNB",
      shortname: "Telkom SA SOC Ltd",
      quoteType: "EQUITY",
      symbol: "TKG.JO",
      index: "quotes",
      score: 20234,
      typeDisp: "Equity",
      longname: "Telkom SA SOC Limited",
      isYahooFinance: true
    },
    {
      exchange: "PNK",
      shortname: "TELKOM INDONESIA(PERSERO) TBK",
      quoteType: "EQUITY",
      symbol: "TLKMF",
      index: "quotes",
      score: 20068,
      typeDisp: "Equity",
      longname: "Perusahaan Perseroan (Persero) PT Telekomunikasi Indonesia Tbk",
      isYahooFinance: true
    },
    {
      exchange: "PNK",
      shortname: "TELKOM SA SOC LTD",
      quoteType: "EQUITY",
      symbol: "TLKGY",
      index: "quotes",
      score: 20017,
      typeDisp: "Equity",
      longname: "Telkom SA SOC Limited",
      isYahooFinance: true
    },
    {
      exchange: "MUN",
      shortname: "TELKOM SA SOC  RC 10",
      quoteType: "EQUITY",
      symbol: "TZL1.MU",
      index: "quotes",
      score: 20001,
      typeDisp: "Equity",
      isYahooFinance: true
    },
    {
      exchange: "BER",
      shortname: "TELKOM INDONESIA B  RP 50",
      quoteType: "EQUITY",
      symbol: "TCID.BE",
      index: "quotes",
      score: 20001,
      typeDisp: "Equity",
      isYahooFinance: true
    },
    {
      exchange: "MUN",
      shortname: "TELKOM INDONESIA B  RP 50",
      quoteType: "EQUITY",
      symbol: "TCID.MU",
      index: "quotes",
      score: 20001,
      typeDisp: "Equity",
      isYahooFinance: true
    }
  ],
  news: [
    {
      "uuid": "bfafc91b-1e38-3c19-a75b-360548d3a630",
      "title": "Global Mobile Phones Industry Almanac 2021 - ResearchAndMarkets.com",
      "publisher": "Business Wire",
      "link": "https://finance.yahoo.com/news/global-mobile-phones-industry-almanac-120800269.html",
      "providerPublishTime": 1622117280,
      "type": "STORY"
    },
    {
      "uuid": "58a3e148-a814-3f35-ab00-3390811a7c71",
      "title": "Indonesian agritech platform TaniHub Group harvests a $65.5M Series B round",
      "publisher": "TechCrunch",
      "link": "https://finance.yahoo.com/m/58a3e148-a814-3f35-ab00-3390811a7c71/indonesian-agritech-platform.html",
      "providerPublishTime": 1621589383,
      "type": "STORY"
    },
    {
      "uuid": "cd7ce5fc-95a7-3855-8e6c-9d73e6fffa74",
      "title": "The Station: Exits at Waymo and Bird's SPAC reveals its scooter-nomics",
      "publisher": "TechCrunch",
      "link": "https://finance.yahoo.com/m/cd7ce5fc-95a7-3855-8e6c-9d73e6fffa74/the-station%3A-exits-at-waymo.html",
      "providerPublishTime": 1621265821,
      "type": "STORY"
    },
    {
      "uuid": "73dcfe3d-9911-33a6-8a88-a408c509cd42",
      "title": "Winners in 2021 Asia-Pacific Stevie Awards Announced",
      "publisher": "PR Newswire",
      "link": "https://finance.yahoo.com/news/winners-2021-asia-pacific-stevie-040000084.html",
      "providerPublishTime": 1620792000,
      "type": "STORY"
    },
    {
      "uuid": "7f522f92-853a-32ca-afd5-719944f95437",
      "title": "Telin chooses Odine's Orion Solution to Drive Global Expansion and Business Automation",
      "publisher": "PR Newswire",
      "link": "https://finance.yahoo.com/news/telin-chooses-odines-orion-solution-080000798.html",
      "providerPublishTime": 1620720000,
      "type": "STORY"
    },
    {
      "uuid": "30913833-386b-339f-b042-fd1e1191c23b",
      "title": "Telkomsel invests an additional $300 million in Gojek",
      "publisher": "TechCrunch",
      "link": "https://finance.yahoo.com/m/30913833-386b-339f-b042-fd1e1191c23b/telkomsel-invests-an.html",
      "providerPublishTime": 1620625923,
      "type": "STORY"
    },
    {
      "uuid": "021be1c3-1acf-3555-8581-f777ff79651f",
      "title": "PT Telkom Indonesia (Persero) Tbk 2020 Filed Annual Report on Form 20-F",
      "publisher": "PR Newswire",
      "link": "https://finance.yahoo.com/news/pt-telkom-indonesia-persero-tbk-120000774.html",
      "providerPublishTime": 1620043200,
      "type": "STORY"
    },
    {
      "uuid": "18a71533-2ad1-3fad-a7f4-482c13b52110",
      "title": "Telkom Published Financial Statements 2020",
      "publisher": "PR Newswire",
      "link": "https://finance.yahoo.com/news/telkom-published-financial-statements-2020-055000643.html",
      "providerPublishTime": 1620021000,
      "type": "STORY"
    }
  ],
  nav: [],
  lists: [],
  researchReports: [],
  totalTime: 28,
  timeTakenForQuotes: 423,
  timeTakenForNews: 600,
  timeTakenForAlgowatchlist: 400,
  timeTakenForPredefinedScreener: 400,
  timeTakenForCrunchbase: 0,
  timeTakenForNav: 400,
  timeTakenForResearchReports: 0
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

