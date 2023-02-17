const express = require("express");

const ProductMananger = require("./productMananger.js")
const initialProducts = require("./initialProducts")

// start of the actual server



const productMananger = new ProductMananger(initialProducts, "./data")

const app = express()

app.get('/products', (req, res) => {
    res.send(productMananger.getProducts())
})

app.listen(8000, () => {
    console.log("server started!")
})






