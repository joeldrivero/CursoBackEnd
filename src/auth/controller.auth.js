const { Router } = require("express");
const User = require("../models/users.model")

const router = Router()

router.post("/", async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                req.session.user = {
                    first_name: "Admin",
                    last_name: "Admin",
                    email: "adminCoder@coder.com",
                    role: "admin"
                }
            }
            else {
                return res.status(400).json({ error: "El usuario y la contraseña no coinciden" })
            }
        }
        else {
            if (user.password !== password)
                return res.status(400).json({ error: "El usuario y la contraseña no coinciden" })
            req.session.user = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: "user"
            }

        }

        res.json({ message: "Sesion iniciada" })

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.get("/logout", (req, res) => {
    try {
        req.session.destroy(error => {
            if (error) return res.json({ error })
            res.redirect("/login")
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router
