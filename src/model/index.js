const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

// Define a function that retrieves all objects of a type.
const readAll = (requester, object) => {
  return dbPowers.selectAll(requester, object)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submitAll(requester, dbQueries.getSelectAllQuery(object));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

// Define a function that retrieves 1 object.
const read1Record = (requester, object, id) => {
  return dbPowers.select1Row(requester, object, id)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit1(
        requester, dbQueries.getSelect1RowQuery(object, id)
      );
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

// Define a function that retrieves 1 property of all objects of a type.
const read1Property = (requester, object, property) => {
  return dbPowers.select1Col(requester, object, property)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submitAll(
        requester, dbQueries.getSelect1ColQuery(object, property)
      );
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

// Define a function that creates a record and logs the creation.
const create1Record = (requester, object, specs) => {
  return dbPowers.insertRows(requester, object, specs)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit1(
        requester, dbQueries.getInsert1RowQuery(object, specs)
      );
      // .then(resultRow => resultRow)
      // .catch(error => error);
    }
    else {
      return false;
    }
  })
  .catch(error => error);
};

// Define a function that deletes a record and logs the deletion.
const delete1Record = (requester, object, id) => {
  return dbPowers.delete1Row(requester, object, id)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit1(
        requester, dbQueries.getDelete1RowQuery(object, id)
      );
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

// Define a function that updates a property of a record and logs the update.
const update1Value = (requester, object, id, property, value) => {
  return dbPowers.update1Value(requester, object, id, property, value)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit1(
        requester, dbQueries.getUpdate1ValueQuery(object, id, property, value)
      );
      // .then(resultRow => resultRow)
      // .catch(error => error);
    }
    else {
      return false;
    }
  })
  .catch(error => error);
};

module.exports = {
  readAll, read1Record, read1Property,
  create1Record, delete1Record, update1Record
};
