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

app.post('/mysql', (req, res) => {

    connect.query(`INSERT INTO user (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`)

    connect.query(`SELECT * FROM user`, (err, result) => {
        res.json(result);
    })
})

app.put('/mysql', (req, res) => {

    connect.query("UPDATE user SET email = ?, name = ?, password = ? WHERE id = ?",
        [req.body.email, req.body.name, req.body.password, req.body.id])

            connect.query(`SELECT * FROM user`, (err, result) => {
                res.json(result);
            })
    })

    app.use('/users', userRouter);
    app.use('/products', productRouter);


    app.listen(5000, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Listen 5000...');
        }
    })
