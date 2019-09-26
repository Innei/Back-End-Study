const express = require('express')
const path = require('path')
module.exports = app => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/../static/index.html'))
  })
  router.post('/', async (req, res) => {
    const { query } = req.body
    const db = req.app.get('db')
    const result = await db.query(query)
    res.send(result)
  })
  app.use('/query', router)
}
