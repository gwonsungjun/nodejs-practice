const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./config')
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.set('jwt-secret', config.secret)

app.get('/', (req, res) => {
  res.send('Hello JWT')
})

app.use('/api', require('./routes/api'))

app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})

mongoose.connect(config.mongodbUri, {
  dbName: 'jwt-example'
}, (error) => {
  if (error) console.log('몽고디비 연결 에러', error)
  else console.log('몽기디비 연결 성공')
})
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('connected to mongodb server')
})
