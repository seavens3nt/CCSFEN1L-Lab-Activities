const mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/CCSFEN1L_Gutierrez";

async function dbConnect() {
    return mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 }).then(() => {
        console.log("Successfully connected to MongoDB!");
    }).catch((error) => {
        console.log("Unable to connect to MongoDB");
        console.log(error.message);
        throw error;
    });
}

module.exports = dbConnect;
