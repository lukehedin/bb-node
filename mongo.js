const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;

module.exports = {
    isDev: false,
    connect: function (callback) {
      MongoClient.connect(MONGO_URL, (err, dbConnection) => {  
        if (err) return console.log(err);
        callback(dbConnection);
      });
    },
    find: function(collection, selector, callback){
      this.connect(dbConnection => {
        dbConnection.db(MONGO_DB).collection(collection).find(selector).toArray((err, res) => {
          if (err) { //Error first
            dbConnection.close();
            return console.log(err);
          }

          // Success
          if(callback) callback(res);
          dbConnection.close();
        });
      });
    },
    findOne: function(collection, selector, callback){
      this.connect(dbConnection => {
        dbConnection.db(MONGO_DB).collection(collection).findOne(selector, (err, res) => {
          if (err) { //Error first
            dbConnection.close();
            return console.log(err);
          }

          // Success
          if(callback) callback(res);
          dbConnection.close();
        });
      });
    },
    insertOne: function(collection, data, callback){
      this.connect(dbConnection => {
        // Do something with db here, like inserting a record
        dbConnection.db(MONGO_DB).collection(collection).insertOne(data, (err, res) => {
            if (err) { //Error first
              dbConnection.close();
              return console.log(err);
            }

            // Success
            if(callback) callback(res);
            dbConnection.close();
          }
        );
      });
    },
    log: function(category, message, detail){
      category = category.toUpperCase();
      let timestamp = new Date();
      let isDev = this.isDev;

      this.insertOne('logs', {
          category,
          message,
          detail,
          isDev,
          timestamp
      });
    }
};