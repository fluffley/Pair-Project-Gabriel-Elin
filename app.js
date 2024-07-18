const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const app = express()
const port = 3000
const session = require('express-session')
const encrypt = require('bcryptjs')

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'MEGIDOLAON12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})