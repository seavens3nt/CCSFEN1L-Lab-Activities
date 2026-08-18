const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    studentNumber: {
        type: String
    },
    course: {
        type: String
    },
    yearLevel: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema)
