// const mongodb=require("mongodb")
const { MongoClient } = require("mongodb");

const mongoconnect=callback=>{
    const client = new MongoClient("mongodb://localhost:27017");
    client.connect().then(result=>{console.log("Connected to MongoDB");
        callback(result)
    }).catch(err=>{console.log(err)});

}

module.exports=mongoconnect