const { Router } = require("express");
const passport = require("passport");
const User = require("../models/users.model")
const { isValidPassword } = require("../utils/cryptPassword");

const router = Router()

router.post("/", passport.authenticate("login", { failureRedirect: "/failLogin" }), async (req, res) => {
    try {

        if (!req.user)
            return res.status(400).json({ error: "El usuario y la contraseña no coinciden" })

        let role = ""
        if (req.user.role)
            role = req.user.role
        else
            role = "user"

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: role
        }
        res.json({ message: "Sesion iniciada" })

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {

/*     req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: role
    } */

})


router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products")
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

router.get("/failLogin", async (req, res) => {
    console.log("Error")
})

module.exports = router
