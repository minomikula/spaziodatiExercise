## Build

Run `npm ci` to install dependencies. Build client `cd client && ng build`.

## Running the server

Run `node server/app.js`. App will be on http://localhost:8000/. Example user is `login: "example@example.com", password: "password"`

## Implementation details

### Json Web Tokens

I choosed to implement authentification by json web tokens, because it is simpler than session based implementation. It was the first time that I used jwt, as I only used sessions before. I was able to create demo with working multi-tab support and api endpoint `api/data/secret` only accessible after login. It simplifies login/logout logic, so logout is not longer async. Logout button is without loading and there is no `/logout` endpoint, but I think that I demonstrated such same behavior in Login case.
