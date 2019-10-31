const MongoClient = require('mongodb').MongoClient;

const url ='mongodb://192.168.100.25:27017';
const option = {useNewUrlParser: true,useUnifiedTopology:true};
const dbName = 'webphuket';

module.exports = new Promise((resolve, reject) =>{
    MongoClient.connect(url, option, (err, client) => {
        if(err) throw err;
        const mongo = client.db(dbName);
        console.log("Connected");
        resolve(mongo);
    })
})