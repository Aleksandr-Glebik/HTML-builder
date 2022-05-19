const fs = require('fs');
const path = require('path');

const newReadStream = fs.createReadStream(
    path.join(__dirname, 'text.txt'),
    'utf-8',
)

let data = ''
newReadStream.on('err', err => console.log('Error', err.message))
newReadStream.on('data', chunk => data += chunk)
newReadStream.on('end', () => console.log(data))

