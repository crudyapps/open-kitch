const { src, dest, parallel } = require('gulp');

function packageJsons() {

    return src('package*.json')
        .pipe(dest('dist/'));

}
exports.packageJsons = packageJsons;
exports.default = parallel(packageJsons);
