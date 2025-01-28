const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Texts = mongoose.model('Text', TextSchema);

module.exports = Texts;