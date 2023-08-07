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
    mods.sort((a, b) => {
        if (a.updated > b.updated) {
            return 1;
        }
        if (a.updated < b.updated) {
            return -1;
        }
        if (a.publisched < b.published) {
            return 1;
        }
        if (a.published > b.published) {
            return -1;
        }
        return 0;
    });
    fs.writeFileSync(__dirname + '/../deploy/index.html', handlebars.compile(fs.readFileSync(__dirname + '/template.html', 'utf8'))({mods}));
});
