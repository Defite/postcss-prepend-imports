var postcss = require('postcss');
var path = require('path');

module.exports = postcss.plugin('postcss-prepend-imports', function (opts) {
    opts = opts || {};
    opts.path = opts.path || '';
    opts.files = opts.files || [];
    opts.exclude = opts.exclude || [];

    const filePath = root.source.input.file;

    if (filePath && opts.exclude.find(
            (excludeItem) => filePath.includes(excludeItem)
        )) {
        return;
    }
    
    return function (root) {
        opts.files.reverse().forEach(file => {
            file = path.resolve(opts.path, file);
            root.prepend({ name: 'import', params: '"' + file + '"' });
        });
    };
});
