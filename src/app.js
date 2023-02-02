require("dotenv").config()
const app = require("./index")
const { Server } = require("socket.io")
const port = process.env.PORT;
const ProductManager = require("./ProductManager")
const productos = new ProductManager("./src/products.json")

const httpServer = app.listen(port, () => {
    console.log(`Servidor iniciado en la url http://localhost:${port} puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket => {

    console.log(`Nueva conexion ${socket.id}`)

    socket.emit("getProducts", productos.getProductsSync())

    socket.on('addProduct', data => {
        socket.emit('getProducts', productos.getProductsSync())
    })

})



