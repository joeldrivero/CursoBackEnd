const { Router } = require("express")
const router = Router();
const transport = require("../utils/gmail.util")

router.get("/", async (req, res) => {
    try {
        const [to, subject, message] = req.body
        const mailOptions = {
            from: gmailUser,
            to,
            subject,
            html: `<html><div>${message}</div>
            </html>`,
            attachments: [],
        }
        const result = await transport.sendMail(mailOptions)

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

module.exports = router;