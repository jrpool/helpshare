// This module routes all role requests. Prefix: “/roles”.

const router = require('express').Router();
const modelQueries = require('../model/queries');

// Handle requests to create roles.
router.post('/', (request, response) => {
  const {requester, description} = request.body;
  modelQueries.create(requester, 'role', false, {description})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/roles/post):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created role ${result} (${description}).\n`
          : `Member ${requester} may not create roles.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/roles/post):\n' + error + '\n');
  });
});

// Handle requests to create roleplays.
router.post('/grant', (request, response) => {
  const {requester, member, role} = request.body;
  modelQueries.create(requester, 'roleplay', false, {member, role})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/roles/post/grant):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} granted member ${member} role ${role}.\n`
          : `Member ${requester} may not grant roles.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/roles/post):\n' + error + '\n');
  });
});

module.exports = router;
