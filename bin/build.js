const fs = require('fs');
const yaml = require('yamljs');
const handlebars = require('handlebars');
const crypto = require('crypto');

const fileHash = (file) => {
    const hash = crypto.createHash('md5');
    hash.setEncoding('hex');
    hash.write(fs.readSync(__dirname + '/../styles/' + file, 'utf8'));
    hash.end();
    return hash.read();
}
handlebars.registerHelper('dateOnly', function (date) {
    const dt = new Date(date);
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
});
handlebars.registerHelper('linebreak', function () {
    return `\n`;
});

handlebars.registerHelper('lowerCase', function (string) {
    return `${string}`.toLowerCase();
});
fs.mkdirSync(__dirname + '/../deploy');
for (const style in ['design.css', 'reset.css', 'layout.css']) {
    fs.writeFileSync(
        __dirname + '/../deploy/' + style,
        fs.readFileSync(__dirname + '/../styles/' + style, 'utf8')
    );
}
yaml.parseFile('mods.yml', function (mods) {
    mods = mods.sort((a, b) => {
        if (a.updated.getTime() > b.updated.getTime()) {
            return -1;
        }
        if (a.updated.getTime() < b.updated.getTime()) {
            return 1;
        }
        if (a.released.getTime() > b.released.getTime()) {
            return 1;
        }
        if (a.released.getTime() < b.released.getTime()) {
            return -1;
        }
        return 0;
    });
    fs.writeFileSync(
        __dirname + '/../deploy/index.html',
        handlebars.compile(fs.readFileSync(__dirname + '/template.html', 'utf8'))({
            mods,
            layoutHash: fileHash('layout.css'),
            resetHash: fileHash('reset.css'),
            designHash: fileHash('design.css')
        })
    );
});
