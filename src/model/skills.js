const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a skill, logs it, and returns a promise resolvable with the ID of the
  new skill.
*/
const create = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'skill', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'skill', [description]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that, if there is an authorizing add_row power, creates
  a domain, logs it, and returns a promise resolvable with the ID of the
  new domain.
*/
const createDomain = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'domain', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'domain', [description]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that, if there is an authorizing add_row power, creates
  a domain, logs it, and returns a promise resolvable with the ID of the
  new domain.
*/
const createRelevance = (requester, skill, domain) => {
  return dbPowers.hasRow(requester, 'add', 'relevance', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'relevance', [skill, domain]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that, if there is an authorizing own-row add_row power,
  creates a claim, logs it, and returns a promise resolvable with the ID
  of the new claim.
*/
const createClaim = (requester, skill) => {
  return dbPowers.hasRow(requester, 'add', 'claim', true)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'claim', [requester, skill]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

module.exports = {create, createClaim, createDomain, createRelevance};
