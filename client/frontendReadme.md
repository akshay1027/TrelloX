### SignIn logic:
1) Problem with sending form data, so used axios for now.

### A lot of learning from Material UI
1) Material ui config
2) Using Breakpoints
3) Using popup boxes
4) Conditional editing values
5) fade transitions

### React learnings: 
1) Splitting into components.
2) React DnD
3) Socket.io client

### Bugs: 
1) Major bug when user sign in but the header is not set in axios and boards are not loaded as a result. When we reload page, it works. (still dont know why 😓)
    Tried using useEffect, useState hooks to solve this but didnot work.
        SOL: Send header explicitely in every request. 
         note: get request, headers first.
               post request, headers last.


### Redux Toolkit

    Component -> make API call -> Call Dispatch -> Store payload in global state -> Make a function to send this data -> Access it using UseAppSelector

### Explore and Optimisation
1) RTK query
2) 