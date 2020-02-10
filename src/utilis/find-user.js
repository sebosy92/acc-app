const pool = require ('../db/pg')



const findUser = async (email) => {
    const client = await pool.connect()
    const table = 'users'
    try {
        const query = `select * from ${table} where email = $1`
        const res = await client.query(query,[ email ])
        await client.release()
        return (res.rows)
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = findUser