const pool = require ('../db/pg')
const bcrypt = require ('bcrypt')

const table = 'users'

const newUser = async ( data ) => {
    const client = await pool.connect()
    const hashPassword = await bcrypt.hash(data.password, 8)
    try {
        const query = `INSERT INTO ${table} VALUES ($1, $2, $3)`
        values = [data.email, data.surname, hashPassword ]
        await client.query(query, values)
        await client.release()
    }
    catch (e) {
        console.log (e)
    }
}

module.exports = newUser