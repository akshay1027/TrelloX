### Architecture: Modal, Routes, Controller & Middleware

### signIn logic:
1) Get email and password from request. Validate the request body.
2) Check if user exists using email (as its unique).
3) Check the password from request and the hashed password stored in db.
4) Generate a new JWT token for the user.
5) Send JWT token as responce.

### signUp logic: 
1) Get email, username, password etc from user.
2) Validate all the request body.
3) Check if email already exists.
4) Store request body data to DB.
5) Generate a new JWT token for the user.
6) Send JWT token as responce.