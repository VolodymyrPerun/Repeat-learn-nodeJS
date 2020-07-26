// console.log(22);
//
// const {calculate,z} = require('./main');
//
// let num = calculate(1,2);
// console.log(num+z)

const path = require('path');
const fs = require('fs');

const os = require('os');

// console.log(os.platform());
//
// fs.writeFile(path.join(__dirname, 'files', 'data.txt'), 'Hello, World! \n', err => {
//     console.log(err);
// })
//
//
// for (let i = 0; i < 10; i++) {
//     fs.appendFile(path.join(__dirname, 'files', 'data.txt'), 'Hello, World! \n', {flag: 'a'}, err => {
//         console.log(err);
//     })
// }
//
//
//
//     fs.readFile(path.join(__dirname,'files', '40543828_287549665180409_5606730224654876672_n.mp4'), (err, data) => {
//         console.log(data.toString());
//     })



// fs.stat(path.join(__dirname, 'files', 'data.txt'), (err, stats) => {
//     console.log(stats);
// })

fs.mkdir(path.join(__dirname, 'папка'), err => {
    console.log(err);
})


fs.rmdir(path.join(__dirname, 'папка'), err => {
    console.log(err);
})
