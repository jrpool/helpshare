const db = require('./db').db;
const log = require('./log');

const insert = (doer, relation, values) => {
  db.none(
    `INSERT INTO ${relation} VALUES (${values.join(', ')}) RETURNING idRow`
  )
  .then(idRow => {
    for (const col of Object.keys(values)) {
      log.insert(doer, ${relation}, idRow.id, col, values[col]);
    }
    return '';
  })
  .catch(error => error);
};

module.exports = {insert};
