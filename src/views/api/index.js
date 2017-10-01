const reportAll = (resultRows, requester, object, response) => {
  if (resultRows) {
    response.json({requester, action: 'read', object, resultRows});
  }
  else {
    response.json(
      {requester, action: 'read', object, error: 'no permission'}
    );
  }
};

const report1Record = (resultRow, requester, object, id, response) => {
  if (resultRow) {
    response.json({requester, action: 'read', object, id, resultRow});
  }
  else {
    response.json(
      {requester, action: 'read', object, error: 'no permission'}
    );
  }
};

const report1Property = (
  resultRows, requester, object, property, response
) => {
  if (resultRows) {
    response.json({requester, action: 'read', object, property, resultRows});
  }
  else {
    response.json(
      {requester, action: 'read', object, property, error: 'no permission'}
    );
  }
};

const created1Record = (resultRow, requester, object, specs, response) => {
  if (resultRow) {
    response.json({requester, action: 'create', object, specs, resultRow});
  }
  else {
    response.json(
      {requester, action: 'create', object, specs, error: 'no permission'}
    );
  }
};

const deleted1Record = (resultRow, requester, object, id, response) => {
  if (resultRow) {
    response.json({requester, action: 'delete', object, id, resultRow});
  }
  else {
    response.json(
      {requester, action: 'delete', object, id, error: 'no permission'}
    );
  }
};

const updated1Value = (
  resultRow, requester, object, id, property, value, response
) => {
  if (resultRow) {
    response.json(
      {requester, action: 'update', object, id, property, value, resultRow}
    );
  }
  else {
    response.json({
      requester, action: 'update', object, id, property, value,
      error: 'no permission'
    });
  }
};

const error = (error, response) => {
  renderError(error, response)
};

module.exports = {
  reportAll, report1Record, report1Property, created1Record, deleted1Record,
  updated1Value, error
};
