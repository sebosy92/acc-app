const pool = require ('../db/pg')
const bcrypt = require ('bcrypt')

const updateUser = async function ( column , email , newValue ) {
    const client = await pool.connect()
    try {
      let toChange = newValue
      const query = `update users set ${column} = $2 where email = $1`

      if ( column === 'password') {
        newValue = await bcrypt.hash( newValue, 8)
    }

      await client.query(query,[email, newValue])
      await client.release()
    }
    catch (e) {
      console.log(e)
    }
  }


  module.exports = updateUser