const express = require('express');
const users = require('./route')
let database = require('./database')

// application runs on exprss
const app = express()

// use json or it will get an error when send json objects
app.use(express.json()) // it's a middleware

// url encoded middleware
app.use(express.urlencoded({extended:false}))

// get the users router
// app.use(users)

// add url to users
app.use('/admin', users)

const port = 5000;

// server runs on port 3000
// app.listen(3000);

// with call back function 
// app.listen(5000, ()=> console.log('server has been started...'));

// pass port as a variable
app.listen(port, ()=> console.log(`server is working on port ${port}`))