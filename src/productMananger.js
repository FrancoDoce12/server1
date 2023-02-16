const fs = require('fs')

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

        console.log("first")

        let productsWithSameCode = [
            ...products.filter(productIn => {
                productIn.code == product.code
            })
        ]

        console.log("second")

        if (productsWithSameCode.length > 0) {
            console.log(`${product} have the code repited `)
            return false
        }

        console.log("third")

        if (!(product.id)) {
            product.id = this.idGenerator()
        }
        console.log("final")
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
        return JSON.parse(fs.readFile(`${this.filePath}`, {encoding:"utf8"},(err)=>{}))
        //return JSON.parse(fs.readFile(this.filePath, {encoding:"utf8"},()=>{}))
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

module.exports = ProductMananger
//export default ProductMananger