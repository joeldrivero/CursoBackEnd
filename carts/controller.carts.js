//ACA VA TODOS LOS METODOS
const { Router } = require("express")

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "hi carts" })
})

router.post("/", (req, res) => {
    res.json({ message: "hi carts post" })
})

module.exports = router;