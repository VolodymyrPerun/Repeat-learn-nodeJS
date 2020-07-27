const {EventEmitter} = require('events')
const fs = require('fs')

/////////////////////////////////////////emitter////////////////////////////////
const ee = new EventEmitter

ee.on('hello', () => {
    console.log('Hello World!');
})////////////////////////////////////////on method

ee.emit('hello')
ee.emit('hello')

ee.once('once', () => {
    console.log('Hello Once!');
})/////////////////////////////////////////once method

ee.emit('once')
ee.emit('once')

console.log(ee.listenerCount('once'));

//////////////////////////////////////////////////streams/////////////////////////

// let writeStream = fs.createWriteStream('./data.txt')
//
// for (let i = 0; i < 10000; i++) {
//     writeStream.write('Hello World! lorem  ipsum dolor Hello World! lorem  ipsum dolor');
// }


// let readStream = fs.createReadStream('./data.txt')
//
// readStream.on('data', (chunk)  => {
//     console.log(chunk);
//     console.log('---------------------------------');
// })

let writeStream = fs.createWriteStream('./data2.txt')

fs.createReadStream('./data.txt').on("data", chunk => {
    console.log(chunk.toString());
    console.log('---------------------------------');
}).on('end', () => {
    console.log('End Stream');
}).pipe(writeStream)


