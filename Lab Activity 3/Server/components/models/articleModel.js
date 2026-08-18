const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: String
    }
},{
    timestamps: true,
});

module.exports = mongoose.models.Article || mongoose.model("Article", articleSchema)
