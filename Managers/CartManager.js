const fs = require('fs');

class CartManager {
    constructor(file) {
        this.path = file; 
    }

    async getCart() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCart(); 
        return carts.find(cart => cart.id === id);
    }

    async createCart() {
        const carts = await this.getCart();
        const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        const newCart = {
            id,
            products: []
        };

        carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCart();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;