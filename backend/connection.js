const { default: mongoose, connection } = require("mongoose");

//Connection with database
async function connectMongoDB(url){
  return  mongoose.connect(url);
}

module.exports= {
        connectMongoDB,
};