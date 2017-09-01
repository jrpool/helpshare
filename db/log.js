const db = require('./db').db;

const insert = (doer, relation, id, col, value) => {
  const query = `
    INSERT INTO change VALUES (
      default, CURRENT_TIME,
      ${doer}, ${relation}, ${id}, ${col}, null, ${value}
    )
  `;
};

const logChange = (doer, relname, id, changes) => {
  const lists = [];
  for (const change of changes) {
    lists.push(`(
      CURRENT_TIME, ${doer}, '${relname}', ${id},
      '${change.colname}', '${change.old}', '${change.new}'
    )`);
  }
  const query = `
    INSERT INTO change (time, member, relname, row, colname, old, new)
    VALUES ${lists.join(', ')}
  `;
  return db.none(query);
};

const logCreation = (doer, relname, id, object, colnames) => {
  const changes = [];
  for (const colname of colnames) {
    changes.push({colname: colname, old: null, new: object[colname]});
  }
  return logChange(doer, relname, id, changes);
};

module.exports = {db, logChange, logCreation};
