const express = require('express');
const fs = require('fs');
const router = express.Router(); 

class ProductManager {
    constructor(file) {
        this.path = file;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return []; 
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length + 1; 
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }

    async updateProduct(id, updatedData) {
        let products = await this.getProducts();
        products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}


const productManager = new ProductManager('./products.json');


router.get('/', async (req, res) => {
    res.json(await productManager.getProducts());
});

module.exports = router; 

router.get('/:id', async (req,res)=> {
    const {id} = req.params;
    const product = await productManager.getProductById(parseInt(id));    if(!product){
        return res.status(404).json({error: 'producto no encontrado'})
        
    }
    res.json(product);

});