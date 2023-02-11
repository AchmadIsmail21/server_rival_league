import dotenv from "dotenv"
dotenv.config()

const {
  DB_HOST,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_PORT
} = process.env;

const dbConfig = {
    HOST: DB_HOST,
    USER: DB_USER_NAME,
    PASSWORD: DB_PASSWORD,
    DB: DB_NAME,
    dialect: DB_DIALECT,
    port: DB_PORT
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
  };

  export default dbConfig