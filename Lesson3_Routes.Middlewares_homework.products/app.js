const express = require('express');
const app = express();
const {productRouter, notFoundRouter} = require('./routes')


app.use(express.json());
app.use(express.urlencoded())


app.use('/product', productRouter);
app.use('/', notFoundRouter);


app.listen(3000, () => {
    console.log('Server listen on port 3000...');
})
