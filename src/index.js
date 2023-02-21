const express = require("express");
const handlebars = require("express-handlebars")

const ProductMananger = require("./productMananger.js")
const initialProducts = require("./initialProducts")
const utils = require("./utils")

// start of the actual server



const productMananger = new ProductMananger(initialProducts, "./data")

const app = express()

app.engine("handlebars", handlebars.engine())

app.set("view engine", "handlebars")

// hagarrar las vistas
app.set("views","src/views") // decirle que las vistas estan en la carpeta vistas





app.get('/',  (req, res) => {

    let products =  productMananger.getProducts()

    res.render("home",{
        products,
        title: "holaaa"
    })
})


app.listen(8000, () => {
    console.log("server started!")
})


// let one = utils.transformToArray("hola")
// let two = utils.transformToArray(["hola"])
// let three = utils.transformToArray([])

// console.log(one,"one",two,"two",three,"three")





