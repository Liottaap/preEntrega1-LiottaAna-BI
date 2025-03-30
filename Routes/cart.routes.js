const express = require('express');
const CartManager = require('../Managers/CartManager');

const router = express.Router();
const cartManager = new CartManager('../Cart.json');

/* Carrito */
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
    res.status(201).json(newCart);
});

router.post('/:cartId/product/:productId', async (req, res) => {
    const { cartId, productId } = req.params;
    const cart = await cartManager.addProductToCart(parseInt(cartId), parseInt(productId));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

module.exports = router;
