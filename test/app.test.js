const request = require('supertest')
const app = require('../src/app')
const bcrypt = require ( 'bcrypt' )
const findUser = require ('../src/utilis/find-user')

const setDatabase = require ('./fixtures/db')


const newUser1 = {
    email: 'test3@mail.com',
    surname: 'Burky',
    password: 'passw0rd'
}



beforeEach(setDatabase)

test ('Should list users from DB', async () => {
    const response = await request( app )
    .get ('/users')
    .expect(200)
    
    expect(response.body).not.toBeNull()
})


test ('Should create user', async () => {
    const response = await request( app )
    .post ('/users')
    .send (newUser1)
    .expect (201)

    const user = await findUser(newUser1.email)
    expect(user[0]).not.toBeNull()

} )

test ('Should log in user', async () => {
    const response = await request( app )
    .post ('/login')
    .send ({
        email: 'testmail1@gmail.com',
        password: 'passw1@'
    })
    .expect(200) 
})

test ('Should not log in user', async () => {
    const response = await request( app )
    .post ('/login')
    .send ({
        email: 'testmail1@gmail.com',
        password: 'passw1@1'
    })
    .expect(500) 
})

