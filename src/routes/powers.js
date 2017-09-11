// This module routes all power requests. Prefix: “/powers”.

const router = require('express').Router();
const modelQueries = require('../model/queries');

// Handle requests to create column powers (i.e. “change” or “read”).
router.post('/col/:power(change|read)', (request, response) => {
  const power = request.params.power;
  const {requester, table, col, role} = request.body;
  modelQueries.create(
    requester, `${power}_col`, false, {relation: table, col, role}
  )
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/powers/post/col):\n'
        + `${result.message}.\n${result.detail}\n`
      );
    }
    else if (!result) {
      response.send(
        `Member ${requester} may not create ${power} column powers.\n`
      );
    }
    else if (role) {
      response.send(
        `Member ${requester} permitted role ${role} `
          + `to ${power} column ${col} of table ${table}.\n`
      );
    }
    else {
      response.send(
        `Member ${requester} permitted members to ${power} `
        + `column ${col} of their own rows of table ${table}.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/powers/post/col): ' + error + '\n');
  });
});

// Handle requests to create row powers (i.e. “add” or “kill”).
router.post('/row/:power(add|kill)', (request, response) => {
  const power = request.params.power;
  const {requester, table, role} = request.body;
  modelQueries.create(requester, `${power}_row`, false, {relation: table, role})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/powers/post/row):\n'
        + `${result.message}.\n${result.detail}\n`
      );
    }
    else if (!result) {
      response.send(
        `Member ${requester} may not create ${power} row powers.\n`
      );
    }
    else if (role) {
      response.send(
        `Member ${requester} permitted role ${role} `
          + `to ${power} ${table} rows.\n`
      );
    }
    else {
      response.send(
        `Member ${requester} permitted members to ${power} `
        + `their own rows of table ${table}.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/powers/post/row): ' + error + '\n');
  });
});

module.exports = router;
