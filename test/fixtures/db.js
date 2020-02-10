const pool = require ('../../src/db/pg')
const bcrypt = require ( 'bcrypt' )


const setDatabase = async () => {

    const client = await pool.connect()
    try {
        const addQuery = `INSERT INTO users VALUES ($1, $2, $3)`
        const deleteQuery = 'DELETE FROM users'
        const hashPassword = await bcrypt.hash('passw1@', 8)
        values1 = ['testmail1@gmail.com', 'Anderson', hashPassword ]
        values2 = ['testmail2@gmail.com', 'Peterson', hashPassword ]
        await client.query(deleteQuery)
        await client.query(addQuery, values1)
        await client.query(addQuery, values2)
        await client.release()
    
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = setDatabase

