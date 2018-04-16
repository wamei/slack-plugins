const path = require('path');
const glob = require('glob');
const entries = {};
glob.sync('./src/*.js').forEach((filename) => {
    entries[filename.replace('./src/', '')] = filename;
});

module.exports = {
    mode: 'production',
    entry: entries,
    output: {
        filename: '[name]',
        path: path.join(__dirname, 'dist')
    }
};
