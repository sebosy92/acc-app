const express = require ('express')
const router = new express.Router()
const findUsers = require ('../utilis/find-user')
const bcrypt = require ('bcrypt')


router.post('/login', async (req, res) => {
    
    try {
        const user = await findUsers(req.body.email)
       
        if (user.length === 0) {
            throw new Error ({ error: 'please authenticate' })
        }
        
        const match = await bcrypt.compare(req.body.password, user[0].password)

        if (!match) {
            throw new Error ({ error: 'please authenticate' })
        }

        req.session.user = {
            email: user[0].email
        }

        req.session.user.expires = new Date(
            Date.now() + process.env.COOKIE_EXPIRATION
          )
        

        res.send({ Message: 'You are log in!' })
    }
    catch (e) {
        res.status(500).send()
    }



})

module.exports = router