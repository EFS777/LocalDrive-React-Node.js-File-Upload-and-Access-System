const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const dbName = "drive";
let dbo = null;

async function getDb() {
    if (dbo) return dbo;
    const client = await MongoClient.connect(url);
    if (client.topology?.isConnected()) console.log("DB Connected");
    dbo = client.db(dbName);
    return dbo;
}

module.exports = { getDb };


