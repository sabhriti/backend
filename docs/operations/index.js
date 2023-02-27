const questions = require('./question');
const factories = require('./factory');
const surveys = require('./survey');


module.exports = {
    paths: {
        ...questions,
        ...factories,
        ...surveys
    }
}
