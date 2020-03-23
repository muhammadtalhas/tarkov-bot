module.exports = {
    mongoClient: require('mongodb').MongoClient,
    //mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds155073.mlab.com:55073/tarkov-bot`,
    mongoUrl: process.env.DB_URL,
    mongoObjectID: require('mongodb').ObjectID,
}