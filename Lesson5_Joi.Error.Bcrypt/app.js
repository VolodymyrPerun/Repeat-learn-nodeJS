const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');
const db = require('./dataBase').getInstance();
db.setModels();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'views')));

app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}))

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const {userRouter, productRouter} = require('./routes')

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.use('/users', userRouter);
app.use('/products', productRouter);

app.use('/*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            status: err.status,
            message: err.message || 'Unknown Error',
            code: err.customCode
    })
});


app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 5000...');
    }
})
