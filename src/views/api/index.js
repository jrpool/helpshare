const reportAll = (resultRows, requester, object, response) => {
  response.type('txt');
  if (resultRows) {
    response.send(
      JSON.stringify({requester, action: 'read', object, resultRows})
      + '\n\n'
    );
  }
  else {
    noPermissionError(response, {requester, action: 'read', object});
  }
};

const report1Record = (resultRow, requester, object, id, response) => {
  response.type('txt');
  if (resultRow) {
    response.send(
      JSON.stringify({requester, action: 'read', object, id, resultRow})
      + '\n\n'
    );
  }
  else {
    noPermissionError(response, {requester, action: 'read', object});
  }
};

const report1Property = (
  resultRows, requester, object, property, response
) => {
  response.type('txt');
  if (resultRows) {
    response.send(
      JSON.stringify({requester, action: 'read', object, property, resultRows}) + '\n\n'
    );
  }
  else {
    noPermissionError(response, {requester, action: 'read', object, property});
  }
};

const created1Record = (resultRow, requester, object, specs, response) => {
  response.type('txt');
  if (resultRow) {
    response.send(
      JSON.stringify({requester, action: 'create', object, specs, resultRow})
      + '\n\n'
    );
  }
  else {
    noPermissionError(response, {requester, action: 'create', object, specs});
  }
};

const deleted1Record = (resultRow, requester, object, id, response) => {
  response.type('txt');
  if (resultRow) {
    response.send(
      JSON.stringify({requester, action: 'delete', object, id, resultRow})
      + '\n\n'
    );
  }
  else {
    noPermissionError(response, {requester, action: 'delete', object, id});
  }
};

const updated1Value = (
  resultRow, requester, object, id, property, value, response
) => {
  response.type('txt');
  if (resultRow) {
    response.send(
      JSON.stringify(
        {requester, action: 'update', object, id, property, value, resultRow}
      ) + '\n\n'
    );
  }
  else {
    noPermissionError(
      response, {requester, action: 'update', object, id, property, value}
    );
  }
};

const error = (error, response) => {
  response.type('txt');
  response.send(JSON.stringify(error) + '\n\n');
};

const noPermissionError = (response, object) => {
  const error = JSON.parse(JSON.stringify(object));
  error.error = 'no permission';
  response.send(JSON.stringify(error) + '\n\n');
};

module.exports = {
  reportAll, report1Record, report1Property, created1Record, deleted1Record,
  updated1Value, error
};
