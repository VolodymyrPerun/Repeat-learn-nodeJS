require('dotenv').config();
const morgan = require('morgan')

const express = require('express');
const exprsBars = require('express-handlebars');
const fileUpload = require('express-fileupload');
const path = require('path');
const {PORT} = require('./config')
const {responseStatusCodesEnum: {SERVER_ERROR}} = require("./constants");
const db = require('./dataBase').getInstance();
db.setModels();


const app = express();

app.use(fileUpload({

}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}))

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public'));


const {authRouter, userRouter, productRouter} = require('./routes')


app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.use('*', (err, req, res) => {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            status: err.status,
            message: err.message || 'Unknown Error',
            code: err.customCode
        })
});


app.listen(PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${PORT || 5000}...`);
    }
})


const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p) => {
    unhandledRejections.delete(p);
});

const {cronRun} = require('./cron');
cronRun();
