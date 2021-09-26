 ### Architecture: Modal, Routes, Controller & Middleware

### SignIn logic:
1) Get email and password from request. Validate the request body.
2) Check if user exists using email (as its unique).
3) Check the password from request and the hashed password stored in db.
4) Generate a new JWT token for the user.
5) Send JWT token as responce.

### SignUp logic: 
1) Get email, username, password etc from user.
2) Validate all the request body.
3) Check if email already exists.
4) Store request body data to DB.
5) Generate a new JWT token for the user.
6) Send JWT token as responce.

### Validate data in middleware:
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

### Mongo db: 
- whenever you find a document using id, email or any other value from request data -> always check if present in db or not!
    eg: 
        const boardDetails = await BoardModal.findById(boardId);
        if(!boardDetails) {
            return res.status(404).json({msg: 'Requested board not found'});
        }

- commonly used CRUD operations using mongoDB: 
    1) findById(ID)
    2) findOne

### Caching: 
1)Boards
2)Lists

### JS core Improvements:
1) unshift -> inserts at beginning of array. 
   Problem: The whole arrays indexes has to be shifted by 1. 
   This will take more.
   Solution: Use push. But in frontend, do .reverse() when mapping the response data.

### Bugs: 
1) Route.get() requires a callback function but got a [object Undefined]
   solution: Whenever you get this, there bug, there is some: 
   1) spelling mistake
   2) import, export error
   3) wrong file location

2) https://stackoverflow.com/questions/40500490/what-is-an-unhandled-promise-rejection. 
   I made a typo mistake.

3) Missed await and it caused a huge problem for me!

### API Endpoints
1) baseUrl/api/boards/newBoard
2) baseUrl/api/boards/allBoards
2) baseUrl/api/boards/:boardId
3) baseUrl/api/boards/activity/:boardId

explore more on try catch, throw error and its relativity with status codes.
