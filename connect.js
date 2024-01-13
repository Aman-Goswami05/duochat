const mongoose = require('mongoose');
mongoose.set("strictQuery",true);
async function conntectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {
    conntectToMongoDB
}