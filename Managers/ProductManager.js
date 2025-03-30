const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.filePath = path.resolve(filePath); 
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos:', error);
            return []; 
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push(product);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return product;
    }

    async updateProduct(id, updatedData) {
        let products = await this.getProducts();
        products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
