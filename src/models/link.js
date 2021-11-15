const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
    {
        'shortURL-key': {
            type: String,
            required: true
        },
        longURL: {
            type: String,
            reuired: true
        }
    }
)

module.exports = mongoose.model('Short_link', linkSchema);
