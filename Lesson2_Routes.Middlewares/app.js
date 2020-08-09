const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'views')));

app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}))

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const {userRouter, productRouter} = require('./routes')

app.use('/users', userRouter);
app.use('/products', productRouter);


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 3000...');
    }
})
