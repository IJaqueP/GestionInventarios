const express = require('express');
const app = express();
const PORT = 3000;

const productRoutes = require('./routes/productsRoutes.js');

app.use(express.json());
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a mi Sistema de Gestión de Inventarios.');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchandose en http://localhost:${PORT}`);
});