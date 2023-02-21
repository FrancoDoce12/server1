const fs = require('fs')
const utils = require('./utils')

class ProductMananger {

    constructor(initialProducts, filePath) {

        this.filePath = filePath
        this.lastId = 0

        let products = this.productsValidated(initialProducts)

        if (products.length > 0) {
            this.deleteAndAddNewData(products)
        } else {
            this.addProducts(products)
        }
    } 

    // utilities methods (those that only are used inside this class)


    utilsGetCodes(array) {
        const codes = {}
        array.forEach(item => {
            codes[item.code] = item.code
        })
        return codes
    }



    // validation functions

    async productsValidated(products) {

        products = utils.transformToArray(products) // it will be always an array

        // first validation
        let validateObjectProducts = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (this.prodcutVlaidationObject(product)) {
                validateObjectProducts.push(product)
            } else {
                console.log(product, "is not validated")
            }
        }


        if (validateObjectProducts.length == 0) {
            return []
        }

        // second validations
        let dataProductsCodes = this.utilsGetCodes(await this.getProducts())

        let validateProducts = []
        for (let i = 0; i < validateObjectProducts.length; i++) {
            const product = validateObjectProducts[i];
            if (!(dataProductsCodes[product.code])) {
                validateProducts.push(product)
            } else {
                console.log(product, "code is repited")
            }
        }


        // adding one id to the validated objects
        validateProducts.forEach(product => {
            product.id = this.getNextId()
        })

        return validateProducts
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

        let validateProduct = await this.productsValidated(products)

        if (validateProduct.length > 0) {
            this.saveProducts((await this.getProducts()).push(products))
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
        fs.writeFileSync(this.filePath, JSON.stringify(products), err => { })
    }

    getProductById(id) {
        let products = this.getProducts()
        // se lo hace asi suponiendo que ningun producto tendra el mismo id
        products = products.filter(product => {
            product.id == id
        })
        let product = products[0]

        return product

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
