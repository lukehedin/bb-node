const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: true,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    //Default options for all defined models
    define: {
        freezeTableName: true //LH: do not pluralise table names for queries (was making 'comment' become 'comments)
    }
});
module.exports = {
    connect: function () {
      this.defineSchema();

      //Establish connection to DB using sequelize
      sequelize.authenticate()
      .then(() => { console.log('Database connection has been established successfully.'); })
      .catch(err => { console.error('ERROR: Unable to connect to the database:', err); });
    },
    sync: function(syncConfig){
      sequelize.sync(syncConfig).then(() => {
        // Tables created
      });
    },
    models: [],
    defineSchema: function() {
      var db = this;

      //Models

      db.models.bounty = sequelize.define('bounty', {
        name: {
          type: Sequelize.STRING
        },
        maxValue: {
          type: Sequelize.DECIMAL(10,2),
          validate: {
            isDecimal: true
          }
        },
        note: {
          type: Sequelize.STRING
        },
        imageId: {
          type: Sequelize.STRING
        }
      });

      db.models.organisation = sequelize.define('organisation', {
        name: {
          type: Sequelize.STRING
        }
      });

      //Associations

      //Each organisation has many bounties
      db.models.organisation.hasMany(db.models.bounty, {as: 'bounties'})
    }
};