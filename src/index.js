const express = require("express");
const handlebars = require("express-handlebars")
const { Server } = require('socket.io')

const ProductMananger = require("./productMananger.js")
const initialProducts = require("./initialProducts")


// start of the actual server



const productMananger = new ProductMananger(initialProducts, "./data")

const app = express()

app.engine("handlebars", handlebars.engine())

app.set("view engine", "handlebars")

// hagarrar las vistas
app.set("views","src/views") // decirle que las vistas estan en la carpeta vistas

app.use(express.static(__dirname + '/public'))

 

app.get('/',  (req, res) => {
    let products =  productMananger.getProducts()
    res.render("home",{
        products,
        title: "holaaa"
    })
})
app.get('/realTimeProducts',  (req, res) => {
    let products =  productMananger.getProducts()
    res.render("realTimeProducts",{
        products,
        title: "holaaa"
    })
})
app.get('/productMananger', (req, res)=>{
    
    res.render('realTimeProducts',{

    })
})



const serverHTTP = app.listen(8000, () => {
    console.log("server started!")
})

const serverSocket = new Server(serverHTTP)

productMananger.serverSocket = serverSocket






