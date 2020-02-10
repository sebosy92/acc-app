const request = require('supertest')
const app = require('../src/app')

const setDatabase = require ('./fixtures/db')

beforeEach(setDatabase)

test ('Should list users from DB', async () => {
    const response = await request( app )
    .GET ('/users')
    .expect(200)
})