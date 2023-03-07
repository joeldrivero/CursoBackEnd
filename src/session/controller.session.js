const { Router } = require("express");

const router = Router()

router.get("/login",(req,res)=>{
    req.session.user="Joel"
    res.send("Login")
})

module.exports = router