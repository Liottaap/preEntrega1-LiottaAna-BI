const express = require('express');
const CartManager = require('../Managers/CartManager');

const router = express.Router();
const cartManager = new CartManager('./src/data/cart.json');

router.get('/', async (req, res) => {
    res.json(await cartManager.getCart());
});

router.get('/:id', async (req, res) => {
    const cart = await cartManager.getCartById(parseInt(req.params.id));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.json(newCart);
});

router.post('/:id/products/:productId', async (req, res) => {
    const cart = await cartManager.addProductToCart(parseInt(req.params.id), parseInt(req.params.productId));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

module.exports = router;