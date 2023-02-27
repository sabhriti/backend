const mongoose = require('mongoose');

const localizedContentSchema = mongoose.Schema({
    lang: {
        type: String,
        required: true,
        default: 'en'
    },
    content: {
        type: String,
        required: false
    }
});

const translationModel = mongoose.Schema({
    key: {
        type: String,
        required: true
    },

    items: [
        {
            type: localizedContentSchema,
            required: true
        }
    ],

    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
});


const Translation = module.exports = mongoose.model('Translation', translationModel);

module.exports.get = function (callback, limit) {
    Translation.find(callback).limit(limit);
};
