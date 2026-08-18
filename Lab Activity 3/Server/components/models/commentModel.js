const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commenter: {
        type: String
    },
    message: {
        type: String
    },
    articleTitle: {
        type: String
    }
},{
    timestamps: true,
});

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
