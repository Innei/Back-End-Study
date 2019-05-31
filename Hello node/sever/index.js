const express = require('express')

const app = express()

// app.get('/', (req,res) => {
//     let response = [{ name: 'yiny' }, { name: 'innei' }]
//     res.json(response)
// })
app.get('/profile/:id', (req, res) => {
    res.send("You id is "+ req.params.id)
})

app.get('/', (req, res) => {
    res.send(req.query.id)

})
app.listen(3000)
console.log('listen to port 3000, http://127.0.0.1:3000')