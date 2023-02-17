const fs = require('fs')

class ProductMananger {

    constructor(initialProducts, filePath) {

        this.filePath = filePath
        this.lastId = 0

        let products = this.productsValidated(initialProducts)


        this.deleteAndAddNewData(products)


    }

    // utilities methods (those that only are used inside this class)

    
    utilsGetCodes(array){
        const codes = {}
        array.forEach(item=>{
            codes[item.code] = item.code
        })
        return codes
    }



    // validation functions

    async productsValidated(products){


        // first validation
        let validateObjectProducts = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if(this.prodcutVlaidationObject(product)){
                validateObjectProducts.push(product)
            } else {
                console.log(product, "is not validated")
            }
        }

        
        if (validateObjectProducts.length == 0 ) {
            return []
        }

        // second validations
        let dataProductsCodes = this.utilsGetCodes(await this.getProducts())

        let validateProducts = []
        for (let i = 0; i < validateObjectProducts.length; i++) {
            const product = validateObjectProducts[i];
            if (!(dataProductsCodes[product.code])){
                validateProducts.push(product)
            } else {
                console.log(product, "code is repited")
            }
        }


        // adding one id to the validated objects
        validateProducts.forEach(product=>{
            product.id = this.getNextId()
        })

        return validateProducts
    }

    getNextId(){
        let newId = this.lastId
        this.lastId++
        return newId
    }

    // just validate the objejt propieties
    prodcutVlaidationObject(product){
        if (!((product.title) && (product.description) && (product.price) && (product.thumbnail) && (product.code) && (product.stock))) {
            return false
        } else {return true}
    }




    // functionals methods ( those that are normaly used )

    async deleteAndAddNewData(newDataArray){
        let data = await newDataArray
        this.saveProducts(data)
    }

    async addProduct(product = "") {
        
        let validateProduct = await this.productsValidated([product])

        if (validateProduct.length > 0 ) {
            this.saveProducts((await this.getProducts()).push(product))
        }  else {
            console.log(product, "has not been added")
        }

    }

    async getProducts() {

        let data = await fs.readFile(`${this.filePath}`, { encoding: "utf8" }, (err) => {})

        let products

        if(data){
            products = JSON.parse(data)
        } else {
            products = []
        }
        
        return products
        
    }

    saveProducts(products) {
        fs.writeFile(this.filePath, JSON.stringify(products),err =>{})
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
