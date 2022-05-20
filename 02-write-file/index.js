const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process

const output = fs.createWriteStream(
    path.join(__dirname, 'text.txt'),
    ''
)

stdout.write('Приложение загружено, ожидаем ввод текста в консоль:\n')

stdin.on('data', data => {
    const dataStringified = data.toString()

    if (dataStringified.includes('exit')) {
        stdout.write('Введенный вами текст, хранится в файле text.txt')
        process.exit()
    }

    output.write(dataStringified)
})

process.on('SIGINT', () => {
    stdout.write('Введенный вами текст, хранится в файле text.txt')
    process.exit()
})