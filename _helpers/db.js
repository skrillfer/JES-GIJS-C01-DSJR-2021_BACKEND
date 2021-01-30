const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const Op = require('sequelize').Op
module.exports = db = {};

initialize();

async function initialize() {
    const envConfig = {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USERDB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    }
    console.log(envConfig);
    // create db if it doesn't already exist
    const { host, port, user, password, database } = envConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', host: host,   operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
      } });
      

    // init models and add them to the exported db object
    db.Prosecution = require('../prosecution/prosecution.model')(sequelize);
    
    db.Country = require('../country/country.model')(sequelize);
    db.Department = require('../department/department.model')(sequelize);
    db.Town = require('../town/town.model')(sequelize);


    db.Town.hasMany(db.Prosecution, { onDelete: 'CASCADE' });
    db.Prosecution.belongsTo(db.Town);

    db.Country.hasMany(db.Department, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    db.Department.belongsTo(db.Country);
    
    db.Department.hasMany(db.Town, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    db.Town.belongsTo(db.Department);


    // sync all models with database
    await sequelize.sync();

}