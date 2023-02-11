import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize"
import userModel from "./User/User.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorAliases: false,
    define: {
        freezeTableName: true,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);

export default db