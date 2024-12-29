const express = require('express')
const { PORT } = require('./config/env')
const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(require('morgan')('dev'))

app.use('/api', require('./routes'))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})