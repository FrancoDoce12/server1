const express = require("express");
const handlebars = require("express-handlebars")

const ProductMananger = require("./productMananger.js")
const initialProducts = require("./initialProducts")

// start of the actual server



const productMananger = new ProductMananger(initialProducts, "./data")

const app = express()

app.engine("handlebars", handlebars.engine())

app.set("view engine", "handlebars")

// hagarrar las vistas
app.set("views","src/views") // decirle que las vistas estan en la carpeta vistas





app.get('/',  (req, res) => {

    let products =  productMananger.getProducts()

    console.log(products)

    res.render("home",{
        products,
        title: "holaaa"
    })
})

// app.get("/", (req,res)=>{
//     res.send()
// })

app.listen(8000, () => {
    console.log("server started!")
})






