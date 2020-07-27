const express = require('express');
const expressBars = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.json())
app.use(express.urlencoded())

app.engine('.hbs', expressBars({
    extname: '.hbs',
    defaultLayout: false
}));

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('main', {  name: 'Viktor', show: false})
});

app.get('/hello', (req, res) => {
    // res.write('Hello from')
    // res.write(' real world!')
    // res.end('Hello, World!')

    res.json('Hello JSON')
})

app.listen(3000, function (err, res, next) {
    if (err) {
        console.log(err);
    } else {

        console.log('Server Listening on port 3000...');
    }

})
