const createCookie = ( email ) => {
    req.session.user = {
        email: email
    }

    req.session.user.expires = new Date(
        Date.now() + 3 * 24 * 3600 * 1000
      )
}

module.exports = createCookie