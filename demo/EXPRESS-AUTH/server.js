const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('./models')

const app = express()
const key = 'ajxhsjacnaj'
app.use(express.json())

app.listen(3001, () => {
    console.log('http://localhost:3001');
})


app.get('/', async (req, res) => {
    res.send('ok')
})

app.post('/api/register', async (req, res) => {

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)

})

app.get('/api/users', async (req, res) => {
    const user = await User.find()
    res.send(user)

})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,

    })
    if (!user) {
        return res.status(422).send({
            message: "用户名不存在"
        })
    }
    // 对比加密密码
    const isPasswordValid = require('bcrypt').compareSync(req.body.password, user.password)

    if (!isPasswordValid) {
        return res.status(422).send({
            message: "密码错误"
        })
    }
    //生成token

    const token = jwt.sign({
        id: String(user._id),

    }, key)
    res.send({
        user,
        token: token,
    })

})

app.get('/api/profile', async (req, res) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { id } = jwt.verify(raw, key)
    const user = await User.findById(id)
    res.send(user)
})