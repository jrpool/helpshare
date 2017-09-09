// This module routes all power requests. Prefix: “/powers”.

const router = require('express').Router();
const powerModel = require('../model/powers');

// Handle requests to create column powers (i.e. “change” or “read”).
router.post('/col/:power(change|read)', (request, response) => {
  const power = request.params.power;
  const {requester, table, col, role} = request.body;
  powerModel.colCreate(requester, power, table, col, role)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/powers/post/col):\n'
        + `${result.message}.\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created a power `
            + `to ${power} column ${col} of table ${table}.\n`
          : `Member ${requester} may not create ${power} column powers.\n`
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
  powerModel.rowCreate(requester, power, table, role)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/powers/post/row):\n'
        + `${result.message}.\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created a power`
            + `to ${power} ${table} rows.\n`
          : `Member ${requester} may not create ${power} row powers.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/powers/post/row): ' + error + '\n');
  });
});

module.exports = router;
