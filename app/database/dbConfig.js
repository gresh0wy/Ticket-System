require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT || 3306,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_ROOT_PASSWORD,
    database: process.env.MARIADB_DATABASE_NAME,
    connectionLimit: 5, // Limit połączeń, dostosuj do potrzeb
    acquireTimeout: 60000, // Czas oczekiwania na połączenie (ms)
    connectTimeout: 10000, // Timeout na inicjalizację
});




module.exports = pool;

