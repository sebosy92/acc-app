const pool = require ('../db/pg')

const table = 'users'

const queryUsers = async () => {
  const client = await pool.connect()

  try{
    const query = `select surname from ${table}`
    const res = await client.query(query)
    client.release()
    return (JSON.stringify(res.rows))
  }
  catch (e) {
    console.log(e)
  } 
}

module.exports =  queryUsers
