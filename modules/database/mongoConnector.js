module.exports = {
    logTeamKill : (db, data, callback) => {
        db.collection('team-kill').updateOne(
            {user: data.killer},
            {$push: {incidents: {user: data.killed, time: new Date(), note: data.note }}},
            {upsert: true},
            (err, result) => {callback(err, result)}
        )
    },

    leaderBoard : (db, data, callback) => {
        db.collection('team-kill').find({}).toArray((err, result) => {
            if (err){
                callback(err);
            }
            callback(err, result);
        })
    },

    userLog : (db, data, callback) => {
        db.collection('team-kill').findOne(
            {user: data.user},
            (err, result) => callback(err, result)
            )
    }
};






//Sample Schemas
/*
    {
        user: "muhammadtalhas",
        incidents: [
        {
            user: Ptyvete
            time: xxxx
            note: Customs Dorms
        }
        ]
    }
 */