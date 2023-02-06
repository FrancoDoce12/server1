let express = require("express");
const fs = require('fs')

console.log("index.js executing")

// inisialisation of prodcut mananger


class ProductMananger {

    constructor(initialProducts, filePath) {
        let products = []
        initialProducts.forEach(product => {

            if (this.productValidation(product)) {
                products.push(product)
            } else {
                console.log(product, "is invalid")
            }

        });
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
            if (err) throw err

        })

        this.lastId = 0
        this.filePath = filePath
    }

    // utilities methods (those that only are used inside this class)

    productValidation(product) {
        if (!((product.title) && (product.description) && (product.price) && (product.thumbnail) && (product.code) && (product.stock))) {
            return false
        }

        let products = this.getProducts()

        let productsWithSameCode = [
            ...products.filter(productIn => {
                productIn.code == product.code
            })
        ]

        if (productsWithSameCode.length > 0) {
            console.log(`${product} have the code repited `)
            return false
        }

        if (!(product.id)) {
            product.id = this.idGenerator()
        }
        return true
    }

    idGenerator() {
        newId = this.id
        this.id = this.id++
        return newId
    }

    // functionals methods ( those that are normaly used )

    addProduct(product) {
        // esto de abajo se podria crear una funcion pero lo dejo hasi 
        // porque no creo que sea tan nesesario añadirle tanta compleijidad en este ejemplo
        if (productValidation(product)) {
            this.saveProducts(this.getProducts().push(product))
        } else {
            console.log(product, "is invalid")
        }
    }

    getProducts() {
        return JSON.parse(fs.readFile(this.filePath, {encoding:"utf8"},()=>{}))
        //return JSON.parse(fs.readFile(this.filePath, "utf8"))
    }
    saveProducts(products) {
        fs.writeFile(this.filePath, JSON.stringify(products))
    }

    getProductById(id) {
        let products = this.getProducts()
        // se lo hace asi suponiendo que ningun producto tendra el mismo id
        return products.filter(product => {
            product.id == id
        })[0]
    }

    updateProduct(id, data) {
        let oldProduct = getProductById(id)
        Object.keys(data).forEach((property) => {
            oldProduct[property] = data[property]
        })
        // delete old product and thean push the new one

        deleteProduct(id)
        addProduct(oldProduct)
    }

    deleteProduct(id) {
        let products = this.getProducts()
        let index = 0

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (product.id == id) {
                index = i
                break
            }
        }
        products.splice(index, 1)

        this.saveProducts(products)
    }
}


// start of the actual server


const products = [
    {
        title: "Galactic Glider",
        description: "A high-tech spacecraft designed for intergalactic travel.",
        price: 999999,
        thumbnail: "assets/glider.jpg",
        code: "GG001",
        stock: 5
    },
    {
        title: "Cosmic Cruiser",
        description: "An advanced spaceship equipped for deep space exploration.",
        price: 888888,
        thumbnail: "assets/cruiser.jpg",
        code: "CC001",
        stock: 3
    },
    {
        title: "Nebula Navigator",
        description: "A sleek spaceship perfect for navigating through the cosmos.",
        price: 777777,
        thumbnail: "assets/navigator.jpg",
        code: "NN001",
        stock: 8
    },
    {
        title: "Star Sentinel",
        description: "A powerful spacecraft designed for defense and security in the galaxy.",
        price: 666666,
        thumbnail: "assets/sentinel.jpg",
        code: "SS001",
        stock: 10
    },
    {
        title: "Astro Avenger",
        description: "An aggressive spaceship built for attacking and defeating enemy forces.",
        price: 555555,
        thumbnail: "assets/avenger.jpg",
        code: "AA001",
        stock: 7
    },
    {
        title: "Meteor Marauder",
        description: "A nimble spaceship ideal for dodging and weaving through hazardous meteor showers.",
        price: 444444,
        thumbnail: "assets/marauder.jpg",
        code: "MM001",
        stock: 9
    },
    {
        title: "Orbital Observer",
        description: "A sophisticated spaceship designed for monitoring and observing the cosmos.",
        price: 333333,
        thumbnail: "assets/observer.jpg",
        code: "OO001",
        stock: 6
    },
    {
        title: "Solar Surfer",
        description: "A cutting-edge spacecraft designed for surfing the solar winds.",
        price: 222222,
        thumbnail: "assets/surfer.jpg",
        code: "SS002",
        stock: 11
    },
    {
        title: "Cosmic Courier",
        description: "A speedy spaceship perfect for delivering packages across the galaxy.",
        price: 111111,
        thumbnail: "assets/courier.jpg",
        code: "CC002",
        stock: 12
    },
    {
        title: "Interstellar Inventor",
        description: "A high-tech laboratory spaceship for inventing and experimenting with new technologies.",
        price: 100000,
        thumbnail: "assets/inventor.jpg",
        code: "II001",
        stock: 2
    },
    {
        title: "Cosmic Creator",
        description: "An advanced 3D printer spaceship capable of creating objects and structures in space.",
        price: 99999,
        thumbnail: "assets/creator.jpg",
        code: "CC003",
        stock: 4
    }]

const productMananger = new ProductMananger(products, "./data")

const app = express()

app.get('/products', (req, res) => {
    res.send(productMananger.getProducts())
})

app.listen(8000, () => {
    console.log("server started!")
})






