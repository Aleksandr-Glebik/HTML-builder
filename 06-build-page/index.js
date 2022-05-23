const fs = require('fs');
const path = require('path')
const fsPromises = require('fs/promises')

const pathProjectDist = path.join(__dirname, 'project-dist')
const pathAssetsDir = path.join(__dirname, 'assets')
const pathCopyAssetsDir = path.join(pathProjectDist, 'assets')

const pathToFolderStyles = path.join(__dirname, 'styles')
const pathToNewStyle = path.join(__dirname, 'project-dist', 'style.css')
let arrCollectStyle = []

async function createMainFolder(path) {
    await fsPromises.mkdir(path)
}

async function copyDir(folder, copyFolder) {
    await fsPromises.rm(copyFolder, { force: true, recursive: true });
    await fsPromises.mkdir(copyFolder, { recursive: true });

    try {
        const files = await fsPromises.readdir(folder, { withFileTypes: true })
        for (const file of files) {
            if (file.isFile()) {
                await fsPromises.copyFile(path.join(folder, file.name), path.join(copyFolder, file.name))
            } else if (file.isDirectory()) {
                await fsPromises.mkdir(path.join(copyFolder, file.name))
                await copyDir(path.join(folder, file.name), path.join(copyFolder, file.name))
            }
        }
    } catch (error) {
        console.log('error', error.message);
    }
}

async function createStyleCss(folder) {
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

    await fsPromises.writeFile(pathToNewStyle, arrCollectStyle)
}

(async function () {
    await fsPromises.rm(pathProjectDist, { recursive: true, force: true })
    await createMainFolder(pathProjectDist)
    await copyDir(pathAssetsDir, pathCopyAssetsDir)
    await createStyleCss(pathToFolderStyles)
})()