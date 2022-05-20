const path = require('path');
const { readdir, stat } = require('fs/promises');

const checkedFolder = path.join(__dirname, 'secret-folder')

async function readCheckedFolder(folder) {
    try {
        const files = await readdir(folder, { withFileTypes: true })
        for (const file of files) {
            if (file.isFile()) {
                const stats = await stat(path.join(folder, file.name))

                const name = (path.parse(file.name).name)
                const extName = (path.parse(file.name).ext.slice(1))
                const size = (stats.size / 1000).toFixed(2) + 'Kb'

                console.log(`${name} - ${extName} - ${size}`);
            }
        }
    } catch(error) {
        console.log('error:', error.message);
    }
}

readCheckedFolder(checkedFolder)