require("dotenv").config()
const { port } = require("./config/app.config")
const app = require("./index")
const { Server } = require("socket.io")

const httpServer = app.listen(port, () => {
    console.log(`Servidor iniciado en la url http://localhost:${port} puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`Nueva conexion ${socket.id}`)
})