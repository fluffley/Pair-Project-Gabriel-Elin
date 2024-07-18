const express = require('express')
const router = require('./routes/router')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.set('view engine','ejs')
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})