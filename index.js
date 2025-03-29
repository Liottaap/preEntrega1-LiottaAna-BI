const express = require('express');
const productsRouter = require('./Managers/ProductManager.js');

const app = express();


app.use(express.json());

app.use('/products', productsRouter);


app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto 8080`);
});
