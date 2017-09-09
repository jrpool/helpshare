const router = require('express').Router();
const roleModel = require('../model/roles');

// Handle requests to create roles.
router.post('/', (request, response) => {
  const {requester, description} = request.body;
  roleModel.create(requester, description)
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
  roleModel.grant(requester, member, role)
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
