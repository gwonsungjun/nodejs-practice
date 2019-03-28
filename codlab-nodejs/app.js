/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world\n');

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});*/


// 익스프레스로 변경
const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello World\n');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});

let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bek'
    },
    {
        id: 3,
        name: 'chris'
    }
]

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    let user = users.filter(user => user.id === id)[0]
    if(!user) {
        return res.status(404).json({error: 'Unknown user'});
    }

    return res.json(user);
});