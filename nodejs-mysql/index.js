const express = require('express')

const app = express()

const db = require('./plugins/db.js')
app.set('db', db)

app.use(express.json())

require('./routes/index.js')(app)

app.listen(3000, () => {
  console.log('server listen on http://127.0.0.1:3000')
})
