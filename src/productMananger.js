const fs = require('fs')
const utils = require('./utils')

class ProductMananger {

    constructor(initialProducts, filePath) {

        this.filePath = filePath
        this.lastId = 0

        initialProducts = utils.transformToArray(initialProducts)

        let validateObjectProducts = this.validateObjectsProducts(initialProducts)

        validateObjectProducts = this.addIDsToProducts(validateObjectProducts)

        this.deleteAndAddNewData(validateObjectProducts)

    }

    // utilities methods (those that only are used inside this class)


    // validation functions



    validateObjectsProducts(products) {
        products = utils.transformToArray(products)

        let validateObjectProducts = []
        products.forEach(product => {
            if (this.prodcutVlaidationObject(product)) {
                validateObjectProducts.push(product)
            } else {
                console.log(product, "is not validated")
            }
        })

        return validateObjectProducts
    }

    validateProductsCodes(products) {
        products = utils.transformToArray(products)

        let oldProductsCodes = this.utilsGetCodes(this.getProducts())
        let validatedProducts = []

        products.forEach(product => {
            if (!(oldProductsCodes[product.code])) {
                validatedProducts.push(product)
            } else {
                console.err(product, "the code of this product is repited with the alredy existent data")
            }
        })
        return validatedProducts
    }

    addIDsToProducts(products) {
        products = utils.transformToArray(products)

        products.forEach(product => {
            product.id = this.getNextId()
        })
        return products
    }


    getNextId() {
        let newId = this.lastId
        this.lastId++
        return newId
    }

    // just validate the objejt propieties
    prodcutVlaidationObject(product) {
        if (!((product.title) && (product.description) && (product.price) && (product.thumbnail) && (product.code) && (product.stock))) {
            return false
        } else { return true }
    }




    // functionals methods ( those that are normaly used )

    async deleteAndAddNewData(newDataArray) {
        let data = await newDataArray
        this.saveProducts(data)
    }

    async addProducts(products) {

        let validateProducts = this.validateObjectsProducts(products)

        validateProducts = this.validateProductsCodes(products)

        if (validateProducts.length > 0) {
            this.saveProducts((this.getProducts()).push(products))
        } else {
            console.log(products, "has not been added")
        }

    }

    getProducts() {

        let products

        let data = fs.readFileSync(this.filePath, { encoding: "utf8" }, (err, data) => { })
        data = JSON.parse(data)

        if (data) {
            products = data
        } else {
            products = []
        }

        return products

    }

    saveProducts(products) {
        products = utils.transformToArray(products)
        fs.writeFileSync(this.filePath, JSON.stringify(products), err => { })
    }

    getProductById(id) {
        let products = this.getProducts()
        // se lo hace asi suponiendo que ningun producto tendra el mismo id
        products = products.filter(product => {
            product.id == id
        })
        let product = products[0]

        if (!product) {
            console.err(`product id: "${id}" NOT FUND`)
            return
        }

        return product
    }


    //revisar funcion
    updateProduct(id, data) {
        let oldProduct = getProductById(id)
        Object.keys(data).forEach((property) => {
            oldProduct[property] = data[property]
        })
        // delete old product and thean push the new one

        deleteProduct(id)
        addProduct(oldProduct)
    }


    // revisar fundion
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
