const express = require('express');
const router = express.Router();
let database = require('./database')

router.get('/', (req, res)=> {
    res.send('hello from the other side')
})

router.get('/admin', (req, res)=> {
    res.send(`It's the admin page`)
})

router.get('/users', (req, res) => {
    console.log('request', req);
    res.send(database)
})

// Dealing with request 
// app.get('/users/:id', (req, res) => {
//     console.log('request id is', req.params.id);
// })

// find user by id
// request to response
router.get('/users/:id', (req, res) => {
    const user = database.find(
        user => user.id == req.params.id 
    )
    if (!user) res.send('no user found')
    res.send(user);
})

// post new data (add new data in the database)
router.post('/addUser', (req, res) => {
    // user object
    const user = {
        // auto incremental id
        id: (database.length + 1),
        /*
            form > input > name: 'ahmed'
            post --> {name: 'ahmed'} object
            the request is req.body
            if I only want ahmed then I make
        */
        name: req.body.name
    }
    database.push(user)
    res.send(database)
})

// put is to edit current data 
router.put('/editUser/:id', (req, res) => {
    // First we get the user
    const user = database.find(
        user => user.id == req.params.id 
    )
    if (!user) res.send('no user found');

    // get the name from the body
    user.name = req.body.name
    res.send(database)
})

// delete object from the database 
router.delete('/deleteUser/:id', (req, res) => {
    // if user id is equal to the router.delete id
    // delete it
    let newDatabase = database.filter(
        u => u.id != req.params.id
    )
    database = newDatabase
    // after edit send back the new database
    res.send(database)
})

module.exports = router