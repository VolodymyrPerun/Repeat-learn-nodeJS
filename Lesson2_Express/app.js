const express = require('express');

const app = express();


app.get('/', (req, res) => {
    // console.log(req);
    res.end('Node Express')
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
