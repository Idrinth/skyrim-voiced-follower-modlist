const fs = require('fs');
const yaml = require('yamljs');
const handlebars = require('handlebars');
handlebars.registerHelper('dateOnly', function (date) {
    const dt = new Date(date);
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
});

handlebars.registerHelper('lowerCase', function (string) {
    return `${string}`.toLowerCase();
});
fs.mkdirSync(__dirname + '/../deploy');
yaml.parseFile('mods.yml', function (mods) {
    mods = mods.sort((a, b) => {
        if (a.updated.getTime() > b.updated.getTime()) {
            return 1;
        }
        if (a.updated.getTime() < b.updated.getTime()) {
            return -1;
        }
        if (a.publisched.getTime() < b.published.getTime()) {
            return 1;
        }
        if (a.published.getTime() > b.published.getTime()) {
            return -1;
        }
        return 0;
    });
    fs.writeFileSync(__dirname + '/../deploy/index.html', handlebars.compile(fs.readFileSync(__dirname + '/template.html', 'utf8'))({mods}));
});
