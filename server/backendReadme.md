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

### validate data in middleware:
Approach: We shouldn't handle validation error in our controller. So If any error is occurring at Validation Layer, it should throw back from there only. We shouldn't allow our control flow to enter into the Controller Layer.

RootServer -> Routes -> Middlewares(authorisation + validation) -> Controllers

### All the bugs and errors i faced: 
- Not parsing data in backend. resulted in undefined error.
- Typo in modal schema, resulted in head ache for hours!
- Did not know the correct procedure of using express validator. finally used it as an middleware.
- Was validating the request in routes and handled error in controller(if any). Learnt from stackoverflow that we shouldn't handle validation error in our controller.
- Learnt about new mongoose methods to do CRUD operations.
- common js (deafult | const, require syntax) VS esjs (we have to specify type: 'module' in package.json | import, from syntax)


### API Documentation: 