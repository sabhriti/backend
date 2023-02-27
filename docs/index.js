const basicInfo = require('./basicInfo');
const servers = require('./server')
const tags = require('./tags');
const components = require('./components/components');
const operations = require('./operations/');

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...operations
};