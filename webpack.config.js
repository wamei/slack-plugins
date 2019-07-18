const path = require('path');
const glob = require('glob');
const fs = require('fs');
const entries = {};

class CreateLoaderPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('CreateLoaderPlugin', (compilation) => {
            const { options: { entry, output: { path: dir } } } = compilation;

            for(let key of Object.keys(entry)) {
                let at = path.resolve(dir, key + '.user.js');
                fs.writeFileSync(at, [
                    `// ==UserScript==
// @name         wamei-${key}
// @namespace    wamei
// @version      0.1
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==`,
                    fs.readFileSync(at),
                ].join('\n\n'));
            }
        });
    }
}

glob.sync('./src/*.js').forEach((filename) => {
    entries[filename.replace(/.\/src\/(.+)\.js/, '$1')] = filename;
});

module.exports = {
    mode: 'production',
    entry: entries,
    output: {
        filename: '[name].user.js',
        path: path.join(__dirname, 'loaders'),
    },
    plugins: [
        new CreateLoaderPlugin(),
    ],
};
