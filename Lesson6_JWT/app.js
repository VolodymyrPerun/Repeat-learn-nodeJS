require('dotenv').config();

const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');
const {responseStatusCodesEnum: {SERVER_ERROR}} = require("./constants");
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

const {authRouter, userRouter, productRouter} = require('./routes')

// app.get('/register', (req, res) => {
//     res.render('register')
// })
//
// app.get('/login', (req, res) => {
//     res.render('login')
// })

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            status: err.status,
            message: err.message || 'Unknown Error',
            code: err.customCode
        })
});


app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${process.env.PORT || 5000}...`);
    }
})


const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p) => {
    unhandledRejections.delete(p);
});
