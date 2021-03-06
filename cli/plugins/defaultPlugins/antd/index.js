const path = require('path');
const fs = require('fs');
const { copyFile, writeFile } = require('../../../tools/files');

class Antd {
    constructor() {
        this.packageVersion = {
            "antd": "4.0.0",
            "less-loader": "5.0.0",
            "less": "3.11.1"
        }
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('antd', () => {
            const packageJson = gen.defaultPackageJson;
            const dependencies = packageJson.dependencies;
            Object.keys(this.packageVersion).map(name => {
                dependencies[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterRootConfig.tap('antd', async () => {
            await copyFile(path.resolve(__dirname, './antd.theme.js'), `${gen.rootPath}/config/antd.theme.js`)
        })
    }
}
module.exports = Antd;