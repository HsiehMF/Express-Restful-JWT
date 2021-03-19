const vocabularyRoutes = require('./routes/vocabulary')
const groupRoutes = require('./routes/group')
const userRoutes = require('./routes/user')

const express = require('express')
const app = express()

app.use(require('body-parser').urlencoded({extended:false}))
app.use(require('body-parser').json())
require('dotenv').config()

app.use('/vocabulary', vocabularyRoutes)
app.use('/group', groupRoutes)
app.use('/user', userRoutes)

const port = process.env.PROT || 3000
app.listen(port, (req, res) => {
    console.log('server is running...')
})