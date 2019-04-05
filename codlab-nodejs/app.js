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

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', require('./api/users'));

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});

module.exports = app;