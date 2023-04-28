function authMiddleware(req, res, next) {
    try {
        const user = req.user;
        if (user.role = "admin") {
            next();
        } else {
            res.status(403).send({ status: "error", message: "Acceso denegado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error });
    }
}

module.exports = authMiddleware