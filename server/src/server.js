const { DB_URL, PORT, DB_NAME, COLL_NAME } = require('./config');
const { logManager, closeLogger, FILENAME_MAX_LENGTH } = require('./logManager');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongourl = DB_URL;

const log = logManager.createLogger('src/server.js'.padEnd(FILENAME_MAX_LENGTH));

app.use(express.static('app'));

app.get('/userList', (req, res) => {
    coll.find({}).toArray().then((data) => { res.json(data); });
});

let db = null;
let coll = null;

const runServer = async (dbName, collName) => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                db = mongoose.connection.client.db(dbName);
                coll = db.collection(collName);
            });
        log.info('Successfully connected to MongoDB database.');
        app.listen(PORT, () => {
            log.info('Server is listening on port: ', PORT);
        }).on('error', (error) => {
            log.fatal(error.message);
            closeLogger().then(process.exit);
        });
    } catch (error) {
        log.fatal('Database connection error: ' + error.message);
        closeLogger().then(process.exit);
    }
};

runServer(DB_NAME, COLL_NAME);
