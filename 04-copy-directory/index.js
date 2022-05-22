const path = require('path')
const { readdir, copyFile, rm, mkdir } = require('fs/promises')

const mainFolder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

async function copyDir(folder, copyFolder) {
    try {
        const files = await readdir(folder, { withFileTypes: true })
        for (const file of files) {
            if (file.isFile()) {
                await copyFile(path.join(folder, file.name), path.join(copyFolder, file.name))
            } else if (file.isDirectory()) {
                await mkdir(path.join(copyFolder, file.name))
                await copyDir(path.join(folder, file.name), path.join(copyFolder, file.name))
            }
        }
    } catch (error) {
        console.log('error', error.message);
    }
}

(async function () {
    await rm(copyFolder, { recursive: true, force: true })
    await mkdir(copyFolder, { recursive: true })
    copyDir(mainFolder, copyFolder)
})()


