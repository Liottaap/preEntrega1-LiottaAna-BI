const express = require('express');
const path = require('path');
const ProductManager = require('../Managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager(path.join(__dirname, '../data/Products.json'));
/* Productos */
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
    await productManager.updateProduct(parseInt(req.params.id), req.body);
    res.json({ message: 'Producto actualizado' });
});

router.delete('/:id', async (req, res) => {
    await productManager.deleteProduct(parseInt(req.params.id));
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;