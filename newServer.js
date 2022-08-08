const { json } = require('express');
const express = require('express');

const app = express()

app.use(express.json())

const users = [
    {
        name: 'abc',
        age: 30
    },
    {
        name: 'def',
        age: 29
    },
    {
        name: 'ghi',
        age: 28
    }
]

app.get('/', (req, res) => {
    res.send('hello from the other side')
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/user/:name', (req, res) => {
    const user = users.find(
        user => user.name == req.params.name
    )
    if (!user)
        res.send('user is not found')
    res.send(user)
})

app.post('/addUser', (reqo, reso) => {

    const user = {
        age: reqo.body.age,
        name: reqo.body.name
    }

    users.push(user)

    reso.send(users)
})

app.listen(8800, () => {
    console.log('server running on port 8800...');
});
