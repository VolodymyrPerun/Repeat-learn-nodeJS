const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');
const {createUser, getUsers} = require('./service/user.service')


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


// app.get('/', (req, res) => {
//     res.render('main', {name: 'Viktor', showed: true})
// })

// app.get('/getusers', async (req, res) => {
//     const users = await getUsers()
//
//     res.render('users', {users})
// })
//
//
// app.get('/register', (req, res) => {
//     res.render('register')
// })
//
// app.get('/login', (req, res) => {
//     res.render('login')
// })
//
// app.post('/auth', (req, res) => {
//     const {email, password} = req.body;
//     const user = users.find(user => user.email === email);
//
//     if (!user) {
//         return res.render('error', {message: 'Wrong email or password'})
//     }
//     // hash password -> hash string
//
//     if (user.password !== password) {
//         return res.render('error', {message: 'Wrong email or password'})
//     }
//
//     res.json({email, name: user.name});
// })
//
//
// app.post('/reg', async (req, res) => {
//     await createUser(req.body);
//
//     res.redirect('/users')
// })
///////////////////////////////////////////////////////////////////////////////

// app.get('/users', async (req, res) => {
//     res.end('Get users')
// })
//
// app.post('/users', async (req, res) => {
//     console.log(req.body);
//     res.end('Post users')
// })
//
// app.put('/users', async (req, res) => {
//     res.end('Put users')
// })
//
// app.delete('/users/:name', async (req, res) => {
//     const params = req.params
//     const query = req.query
//     res.json({params, query})
// })


/////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 3000...');
    }
})
