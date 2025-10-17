const express = require('express');
const router = express.Router();
const {
    readProducts,
    writeProducts,
    addProduct,
    deleteProduct,
    updateProducts,
    findProductsById
} = require('../fileUtils.js');

router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products);
});

router.post('/', (req, res) => {
    const { id, name, price, quantity } = req.body;

    if (!id || !name || price == null || quantity == null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existing = findProductsById(id);
    if (existing) {
        return res.status(400).json({ error: 'El ID ya existe.' });
    }

    const newProduct = { id, name, price, quantity };
    addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado exitosamente.', product: newProduct });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, quantity } = req.body;

    const success = updateProducts(id, { name, price, quantity });
    if (!success) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json({ message: 'Producto actualizado.' });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const success = deleteProduct(id);

    if (!success) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json({ message: 'Producto eliminado.' });
});

module.exports = router;