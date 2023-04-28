function authUserMiddleware(req, res, next) {
    try {
        const user = req.session.user;
        if (user.role == "user") {
            next();
        } else {
            res.status(403).send({ status: "error", message: "Acceso denegado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error });
    }
}

module.exports = authUserMiddleware