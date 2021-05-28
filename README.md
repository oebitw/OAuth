# OAuth using Twitch
401 lab 09 OAuth
## LAB - 09
integrate OAuth instead of managing user names and passwords internally.
​
* [deployment for main branch](https://oebitw-oauth.herokuapp.com/) .
* [submission PR](https://github.com/oebitw/OAuth/pulls) .
​
 
### Setup
​
#### `.env` requirements
​
- `PORT` - 3030
- `MONGODB_URI`
- `SECRET`
- `CLIENT_ID`
- `CLIENT_SECRET`
- `REDIRECT_URI`
​
#### Running the app
​
- `npm start` or `nodemon`
- Endpoint: `/`
  - Returns message
​
 ```
​
    'O-auth'
​
 ```
  
- Endpoint: `/oauth_twitch`
  - Returns a JSON object with the generated password and the username.
​
 ```
    {
        "user": {
        "username": "omar",
        "password": "xxxx"
        }
    }
  
 ```
​
- On Start up : `index.html`
  - Gets the index html page that takes you to log in 
​
 ```
​
  Twitch O-auth
    Login
​
 ```
​
- Endpoint: **anything else ..**
  - Returns an error 404
  - Returns an Object
​
 ```
​
    {
        "error": "Resource Not Found"
    }
​
 ```
#### Pros
- improving App performance 
- reducing complexity. 
- Easier service monitoring
​
​
#### UML
​
(Created with [diagrams](https://app.diagrams.net/))
​
[![image](https://www.linkpicture.com/q/Untitled-Diagram-9.png)](https://www.linkpicture.com/view.php?img=LPic60b0fc179de7b1851387149)
[for more clear view](https://app.diagrams.net/#G1zoDOk8lAzqdxTP_Jhj42a6SY9ibG9Zuf) 