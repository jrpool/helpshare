const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const getStatusName = function(memberID => {
  return db.oneOrNone(`
    SELECT status.description FROM member, status
    WHERE id = memberID AND status.id = member.status
    `);
});

module.exports = db;
