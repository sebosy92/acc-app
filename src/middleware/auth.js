const auth = async (req, res, next) => {

    if (req.session.user) {
        next()
    } else (
        res.status(401).send({ error: 'please authenticate' })
    )
}

module.exports = auth
