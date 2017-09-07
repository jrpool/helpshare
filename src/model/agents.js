const queries = require('../db/queries');
const dbAgents = require('../db/agents');

/*
  Define a function that, if the requester is an inserter authorized to do
  so, creates a column agent (i.e. an updater or a selecter) and returns a
  promise resolvable with the ID of the new agent.
*/
const colCreate = (requester, agent, table, col, role) => {
  return dbAgents.hasRow(requester, 'inserter', agent, false)
  .then(table => {
    if (table) {
      return dbQueries.insert(requester, queries.getInsertQuery(
        'member',
        ['fullname', 'handle', 'phase', 'role'],
        [fullname, handle, phase, role]
      ))
    }
    else {
      throw `Member ${requester} may not create a member.\n`;
    }
  })
  .then(id => {
    if (typeof id !== 'number') {
      throw 'Member insertion failed.';
    }
    else {
      return id;
    }
  })
  .catch(error => error);




  return queries.insert(requester, queries.getInsertQuery(
    agent, ['relation', 'col', 'role'], [table, col, role]
  ))
  .then(id => {
    if (typeof id !== 'number') {
      throw 1;
    }
    else {
      return id;
    }
  })
  .catch(error => {
    console.log('Error (model/agents/colCreate): ' + error.message);
  });
};

/*
  Define a function that creates a row right and returns a promise resolvable
  with the ID of the new right.
*/
const rowCreate = (requester, right, table, role) => {
  return queries.insert(requester, queries.getInsertQuery(
    right, ['relation', 'role'], [table, role]
  ))
  .then(id => {
    if (typeof id !== 'number') {
      throw 1;
    }
    else {
      return id;
    }
  })
  .catch(error => {
    console.log('Error (model/agents/rowCreate): ' + error.message);
  });
};

module.exports = {create};
