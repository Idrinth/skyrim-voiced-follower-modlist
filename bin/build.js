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

yaml.parseFile('mods.yml', function (mods) {
    fs.writeFileSync('deploy/index.html', handlebars.compile(fs.readFileSync('bin/template.html', 'utf8'))({mods}));
});