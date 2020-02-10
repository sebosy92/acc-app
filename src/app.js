const express = require ('express')
const users = require ('./routes/users')
const login = require ('./routes/login')
const session = require ('express-session')

const app = express()

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false
    }))

app.use(express.json())
app.use(users)
app.use(login)


app.all('*', (req, res) => {
  res.status(502).send({ error: 'Wrong endpoint.' })
})

module.exports = app