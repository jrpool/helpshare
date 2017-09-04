const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/helpshare';
module.exports.db = pgp(connectionString);
