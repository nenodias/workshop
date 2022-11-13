var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

mongoClient.connect(process.env.MONGO_URL)
    .then(conn => global.conn = conn.db())
    .catch(err => console.log(err))

function findAll(callback) {
    global.conn.collection('customers').find({}).toArray(callback);
}

function insert(customer, callback) {
    global.conn.collection('customers').insert(customer, callback);
}

function deleteOne(id, callback) {
    global.conn.collection('customers').deleteOne({ _id: new ObjectId(id) },
        callback);
}

module.exports = { findAll, insert, deleteOne }