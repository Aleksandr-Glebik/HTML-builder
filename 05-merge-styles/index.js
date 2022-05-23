const path = require('path')
const fsPromises = require('fs/promises')

const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css')
const pathToFolderStyles = path.join(__dirname, 'styles')

let arrCollectStyle = []

async function createBundleCss(folder) {
    try {
        const files = await fsPromises.readdir(folder, { withFileTypes: true })

        for (const file of files) {
            if (file.isFile()) {
                const fileToRead = path.join(folder, file.name)

                await fsPromises.stat(fileToRead)
                const extName = (path.parse(file.name).ext.slice(1))

                if (extName === 'css') {
                    const cssStyles = await fsPromises.readFile(fileToRead, 'utf8')
                    arrCollectStyle.push(`${cssStyles}\n`)
                }
            }
        }
        
    } catch (error) {
        console.log('error', error.message);
    }

    await fsPromises.writeFile(pathToBundle, arrCollectStyle)
}

(async function () {
    createBundleCss(pathToFolderStyles)
})()
