# ecommerce-server
KickOff API
credit: 
- APIfootbal (https://apifootball.com)
- Web Search API by Roi Krakovski (https://rapidapi.com/contextualwebsearch/api/web-search)


**Achmad Wahyu pratama**
*Hacktiv8 RMT-011*

## POST /users/register
* Request Header
   
    None

* Request Body 

    ```
    { 
        "username": "<body.username>", //string
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "id": "<User.id>", //integer
            "username": "<User.username>", //string
            "email": "<User.email>" //string
        }
        ```
    
* Error Responses:

    Code:400 EMAIL UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "This email already exist" } ] }
        ```

    Code:400 USERNAME UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "Username already Exist" } ] }
        ```


    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "<key> can not be blank" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## POST /login
* Request Header
   
    None

* Request Body 

    ```
    { 
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            "username": "<response.username...>" //string
            "access_token": "<response.token...>" //string
        }
        ```
    
* Error Responses:

    Code:404 NOT FOUND ERROR (change status to 400:VALIDATION ERROR for security reason)
    * Content:
        ```
        { "errors":  { "message": "invalid email and password" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "invalid email and password" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## POST /googleLogin
* Request Header
   
    None

* Request Body 

    ```
    { 
        "googleIdToken": "<body.idToken>" //string
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            "username": "<google.profilename>" //string
            "acces_token": "<user.token...>" //string
        }
        ```
    
* Error Responses:

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## GET /countries
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 
   * none

* Success Response:

    * Code: 200
    * Content:
    ```
    [
        {
            "id": 1,
            "leagueKey": 152,
            "countryName": "England",
            "countryKey": 44,
            "createdAt": "2021-06-01T16:16:54.626Z",
            "updatedAt": "2021-06-01T16:16:54.626Z"
        },
        {
            "id": 2,
            "leagueKey": 302,
            "countryName": "Spain",
            "countryKey": 6,
            "createdAt": "2021-06-01T16:16:54.626Z",
            "updatedAt": "2021-06-01T16:16:54.626Z"
        },..
    ]
    ```
   

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```

## GET /teams
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Query
   * leagueKey : integer

* Request Body 
   * none

* Success Response:

    * Code: 200
    * Content:
    ```
    [
        {
            "team_key": "73",
            "team_name": "Atletico Madrid",
            "team_badge": "https://apiv3.apifootball.com/badges/73_atletico-madrid.jpg",
            "players": [arr of object of stats],
            "coaches": [
                {
                    "coach_name": "Lopetegui",
                    "coach_country": "",
                    "coach_age": ""
                }
            ]
        }, ...

    ]
    ```
   

* Error Responses:

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```

## GET /teams/:teamKey
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * teamKey: //integer

* Request Query
   * none

* Request Body 
   * none

* Success Response:

    * Code: 200
    * Content:
    ```
    
        {
            "team_key": "73",
            "team_name": "Atletico Madrid",
            "team_badge": "https://apiv3.apifootball.com/badges/73_atletico-madrid.jpg",
            "players": [arr of object of stats],
            "coaches": [
                {
                    "coach_name": "Lopetegui",
                    "coach_country": "",
                    "coach_age": ""
                }
            ]
        }, ...

    
    ```
   

* Error Responses:

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```



## GET /favourites
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
        [
            {
                "id": 1,
                "UserId": 1,
                "leagueKey": 152,
                "teamKey": 73,
                "teamName": Atletico Madrid,
                "createdAt": "2021-06-01T16:16:54.626Z",
                "updatedAt": "2021-06-01T16:16:54.626Z"
            },...
        ]
        ```

* Error Responses:
    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```
        
        
## POST /favourites
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    {
        "leagueKey": 152,
        "teamKey": 73,
        "teamName": Atletico Madrid,
    }
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
            {
                "id": 1,
                "UserId": 1,
                "leagueKey": 152,
                "teamKey": 73,
                "teamName": Atletico Madrid,
                "createdAt": "2021-06-01T16:16:54.626Z",
                "updatedAt": "2021-06-01T16:16:54.626Z"
            }
        ```

* Error Responses:
    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```
        


## DELETE /favourites/:favouriteId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * favouriteId : integer

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            "success": {"message": } //string
        }
        ```

* Error Responses:

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Data not found" } }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```



## GET /standings/:leagueKey
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * leagueKey: integer

* Request Body 
    * None
   

* Success Response:

    * Code: 200
    * Content:
        ```[
                {
                    "country_name": "Spain",
                    "league_id": "302",
                    "league_name": "La Liga",
                    "team_id": "73",
                    "team_name": "Atl. Madrid",
                    "overall_promotion": "Promotion - Champions League (Group Stage)",
                    "overall_league_position": "1",
                    "overall_league_payed": "38",
                    "overall_league_W": "26",
                    "overall_league_D": "8",
                    "overall_league_L": "4",
                    "overall_league_GF": "67",
                    "overall_league_GA": "25",
                    "overall_league_PTS": "86",
                    "home_league_position": "",
                    "home_promotion": "",
                    "home_league_payed": "",
                    "home_league_W": "",
                    "home_league_D": "",
                    "home_league_L": "",
                    "home_league_GF": "",
                    "home_league_GA": "",
                    "home_league_PTS": "",
                    "away_league_position": "",
                    "away_promotion": "",
                    "away_league_payed": "",
                    "away_league_W": "",
                    "away_league_D": "",
                    "away_league_L": "",
                    "away_league_GF": "",
                    "away_league_GA": "",
                    "away_league_PTS": "",
                    "league_round": "Current",
                    "team_badge": "https://apiv3.apifootball.com/badges/73_atletico-madrid.jpg",
                    "fk_stage_key": "402",
                    "stage_name": "Current"
                }, ...
            ]
        ```

* Error Responses:
    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```
        

## GET /news
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
    * None

* Request Query
    * teamName: string

* Request Body 
    * None
   

* Success Response:

    * Code: 200
    * Content:
        ```[
                {
                    "id": "5120777423778167667",
                    "title": "Curtis Jones emerges as potential Gini successor despite stop-start campaign",
                    "url": "https://www.thisisanfield.com/2021/06/curtis-jones-emerges-as-potential-gini-successor-despite-stop-start-campaign/",
                    "description": "The 20-year-old could take over Wijnaldum's spot.",
                    "body": "\nAnfield breakthrough\nAfter making 12 appearances in the previous campaign, Jones tally of 34 in his follow-up season paints the picture of a genuine breakthrough.\nHe had already scored the winner in a Merseyside derby, and a decisive penalty in the front of the Kop, but 2020/21 saw the academy graduate firmly establish himself as a first-team regular.\nHis integration began gradually, with Jurgen Klopppreferring the likes of Fabinho Gini Wijnaldum Jordan Hendersonand Naby Keitain midfield, but as injuries began to take their toll, Jones exposure increased.\nIt helped that he took the opportunity and ran with it, with an outstanding display against Atalanta in the Champions Leaguefollowed up by another against Leicester in the Premier League\nHe netted his first Champions Leaguegoal to clinch the 1-0 victory over Ajax in December, which proved to be his most productive month in a Liverpool shirt so far.\nThe young midfielder started six of a possible eight games, covering for injuries to Keita, Thiagoand James Milneralong with the need for Fabinhoto drop into defence.\nDuring that run, however, Jones was subjected to strong criticism for his role in Semi Ajayis equaliser in the 1-1 draw with West Brom leading to a public backing from his manager.\nOne-hundred percent he learns from things like this, definitely, Klopp said.\nIts a very intense period for him as well, and how he did so far is absolutely outstanding. I dont know what would have been when we have all the injuries and he wouldnt have been there.\nIm really happy about everything. Football players make mistakes or make the wrong decisions, I knew that before.\n\nA quiet spring\nIt is possible, however, that Klopp took a more sensitive approach to Jones development as a result, with his game time dropping following the turn of the new year.\nWith Fabinhoand Thiagoable to return to midfield, and Wijnaldum an almost ever-present, the youngsters minutes gradually decreased.\nHe was still trusted against the likes of Man City RB Leipzig and Evertonas a busy February turned to March, but his outing in the 1-0 loss to Chelseaat Anfield proved to be his penultimate start of the season.\nThere were five consecutive games as an unused substitute  during which time Klopp turned to Keita, Milner, Xherdan Shaqiriand Alex Oxlade-Chamberlaininstead  before half an hour on the pitch over three appearances off the bench.\nA first start in two months came in the 2-1 victory over West Brom but the time away from the teamsheet had clearly taken its toll.\nIn March, April and May, Jones played 151 of a possible 1,350 minutes (11.2%), having been on the pitch for 1,061 of 1,890 available minutes (56.1%) in the previous three months.\nThis is despite only Wijnaldum, Andy Robertsonand Mohamed Salahmaking the matchday squad more often than Jones (50 times), and only nine players making more appearances.\nWhether that was Klopp protecting a young player who had been overly relied upon throughout the winter, or simply the need for more experience and proven quality in the run-in, is unclear.\nBut Jones showed enough throughout the campaign to suggest next season could be an even bigger one.\n\nThe next Scouser in our team\nThere are two schools of thought when it comes to Jones role next season.\nIt could be that he maintains a similar level of importance, given he is still only 20 and Thiago Fabinhoand Henderson could all be ahead of him in the pecking order.\nBut the departure of Wijnaldum on a free transfer, and the clubs reported willingness to push forward without signing a replacement, could hint at a major step up for the No. 17.\nWijnaldum was an often misunderstood player, with two of his most valuable attributes being his ball retention and his sheer durability, rather than anything spectacular.\nInteresting, then, is that Jones (92.2%) registeredthe second-highest passing accuracy within the Liverpool squad last season, behind only the Dutchman himself (92.7%), while Wijnaldum was the only midfielder to have been available for more games.\nIts worth noting too that only Salah, Sadio Mane Roberto Firminoand Diogo Jotascored more goals, and only Salah, Mane, Firmino, Robertson and Trent Alexander-Arnoldlaid on more assists.\nIf Klopp is looking for a physically adept, press-resistant midfielder he can rely upon to start week after week, then he may have already unearthed one within the clubs academy.\nBest moment: The winner against Ajax\nWorst moment: A costly mistake against\nRole next season: Hard to say, but the smart money is on Jones taking the Gini role\nShare on facebook",
                    "snippet": "... first Champions Leaguegoal to clinch the 1-0 victory over Ajax in December, which proved to be his most productive month in a <b>Liverpool</b> shirt so far.",
                    "keywords": "",
                    "language": "en",
                    "isSafe": true,
                    "datePublished": "2021-06-02T17:00:31",
                    "provider": {
                        "name": "thisisanfield",
                        "favIcon": "",
                        "favIconBase64Encoding": ""
                    },
                    "image": {
                        "url": "https://www.thisisanfield.com/wp-content/uploads/2020-11-25-156-Liverpool_Atalanta.jpg",
                        "height": 0,
                        "width": 0,
                        "thumbnail": "",
                        "thumbnailHeight": 0,
                        "thumbnailWidth": 0,
                        "base64Encoding": "",
                        "name": null,
                        "title": null,
                        "provider": {
                            "name": "thisisanfield",
                            "favIcon": "",
                            "favIconBase64Encoding": ""
                        },
                        "imageWebSearchUrl": null,
                        "webpageUrl": "https://www.thisisanfield.com/2021/06/curtis-jones-emerges-as-potential-gini-successor-despite-stop-start-campaign/"
                    }
                },...
            ]
        ```

* Error Responses:
    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Invalid access token" }  }
        ```
        
