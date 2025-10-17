const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

// Función para leer los productos desde el archivo JSON
function readProducts() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer el archivo: ', err);
        return [];
    }
}

// Función para escribir productos en el archivo JSON
function writeProducts(products) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error al escribir en el archivo: ', err);
    }
}

// Buscar productos por ID
function findProductsById(id) {
    const products = readProducts();
    return products.find(p => p.id === id);
}

// Agregar un nuevo producto
function addProduct(product) {
    const products = readProducts();
    products.push(product);
    writeProducts(products);
}

// Función para eliminar productos en el archivo JSON
function deleteProduct(id) {
    const products = readProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;

    writeProducts(filtered);
    return true;
}

// Función para actualizar productos en el archivo JSON
function updateProducts(id, newData) {
    const products = readProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products[index] = { ...products[index], ...newData };
    writeProducts(products);
    return true;
}

module.exports = { readProducts, writeProducts, addProduct, deleteProduct, updateProducts, findProductsById };