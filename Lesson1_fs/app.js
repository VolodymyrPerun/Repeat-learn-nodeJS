// console.log(22);
//
// const {calculate,z} = require('./main');
//
// let num = calculate(1,2);
// console.log(num+z)

const path = require('path');
const fs = require('fs');

const os = require('os');
console.log(os.platform());

fs.writeFile(path.join(__dirname, 'files', 'data.txt'), 'Hello, World! \n', err =>{
    console.log(err);
})

