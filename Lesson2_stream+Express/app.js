const {EventEmitter}  = require('events')
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

let writeStream = fs.createWriteStream('./data.txt')

for (let i = 0; i < 1000000; i++) {
    writeStream.write('Hello World! lorem  ipsum dolor Hello World! lorem  ipsum dolor');
}
