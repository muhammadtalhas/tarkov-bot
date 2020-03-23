module.exports = {
    mongoClient: require('mongodb').MongoClient,
    mongoUrl: process.env.DB_URL,
    mongoObjectID: require('mongodb').ObjectID,
}
