const express = require ('express')
const router = new express.Router()
const queryUsers = require ('../utilis/query-users')
const findUsers = require ('../utilis/find-user')
const newUser = require ('../utilis/new-user')
const auth = require ('../middleware/auth')
const updateUser = require ('../utilis/update-users')
const validator = require ('validator')

router.get('/users', async (req, res) => {
    try {
        const users = await queryUsers()
        res.send(users)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post ('/users', async (req, res) => {
    try {
        const isUser = await findUsers(req.body.email)

        if (isUser.length > 0) {
            throw new Error('Email in use!')
        } 

        if (!req.body.email || !req.body.password) {
            throw new Error('Please insert email and password!')
        }

        if (validator.isEmail(req.body.email) === false) {
            throw new Error ('Use valid email address!')
        }

        await newUser(req.body)
        
        res.status(201).send()
    }
    catch (e) {
        res.status(500).send()
    }
})


router.put ('/users', auth, async (req, res) => {
    try {
        let email = req.session.user.email
        const isUser = await findUsers(req.body.email)

        if (validator.isEmail(req.body.email) === false) {
            throw new Error ('Use valid email address!')
        }

        if (isUser.length > 0) {
            throw new Error('Email in use!')
        } 

        let toChange = Object.keys(req.body)


        if (toChange.includes('email')) {
            toChange = toChange.filter( (value) => {return value !== 'email'})

           updateUser ('email', email, req.body.email )

            email = req.body.email


            req.session.user = {
                email
            }
    
            req.session.user.expires = new Date(
                Date.now() + process.env.COOKIE_EXPIRATION
              )
        }

        toChange.forEach( (key) => {
            updateUser(key, email, req.body[key]) 
        } )

        res.status(200).send()
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router