const express = require('express');
const productsRouter = require('./Routes/products.routes');
const cartRouter = require('./Routes/cart.routes')
const app = express();


app.use(express.json());

app.use('/products', productsRouter);
app.use('/cart', cartRouter)

app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto 8080`);
});
