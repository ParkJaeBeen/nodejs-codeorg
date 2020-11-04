const fs = require('fs');

function test() {
    for (i = 10; i > 0; i--) {
        console.log('wait for ' + i + 'second');
        
    }
    console.log(fs.readFileSync('./test/synctext.txt', 'utf8'));
};

function test2(){
    fs.readFile('./test/synctext.txt', 'utf8', (err, data) => {
        for (i = 10; i > 0; i--) {
            console.log('wait for ' + i + 'second');
        }
        console.log(data);
    });
};

//sync
// console.log('first');
// test();
// console.log('second');
// console.log('third');

// console.log('===============');

//async
console.log('first');
test2();
console.log('second');
console.log('third');
