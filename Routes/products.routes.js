const express = require('express');
const ProductManager = require('../Managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    res.json(await productManager.getAll());
});

router.get('/:pid', async (req, res) => {
    res.json(await productManager.getById(parseInt(req.params.pid)));
});

router.post('/', async (req, res) => {
    res.json(await productManager.add(req.body));
});

router.put('/:pid', async (req, res) => {
    res.json(await productManager.update(parseInt(req.params.pid), req.body));
});

router.delete('/:pid', async (req, res) => {
    await productManager.delete(parseInt(req.params.pid));
    res.sendStatus(204);
});

module.exports = router;