const express = require('express');
const CartManager = require('../Managers/CartManager');

const router = express.Router();
const CartManager = new CartManager('./src/data/cart.json');

router.get('/', async (req, res) => {
    res.json(await CartManager.getAll());
});

router.get('/:pid', async (req, res) => {
    res.json(await CartManager.getById(parseInt(req.params.pid)));
});

router.post('/', async (req, res) => {
    res.json(await CartManager.add(req.body));
});

router.put('/:pid', async (req, res) => {
    res.json(await CartManager.update(parseInt(req.params.pid), req.body));
});

router.delete('/:pid', async (req, res) => {
    await CartManager.delete(parseInt(req.params.pid));
    res.sendStatus(204);
});

module.exports = router;