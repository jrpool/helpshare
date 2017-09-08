// This module routes all member requests. Prefix: “/members”.

const router = require('express').Router();
const memberModel = require('../model/members');

// Handle requests to create members.
router.post('/', (request, response) => {
  const {requester, fullname, handle, phase, role} = request.body;
  memberModel.create(requester, fullname, handle, phase, role)
  .then(result => {
    const messages = {
      true: `Member ${requester} created member ${fullname} `
        + `with ID ${result}.\n`,
      false: `Member ${requester} may not create members.\n`,
      error: 'Error (routes/members/post):\n'
        + `${result.message}.\n${result.detail}\n`
    };
    if (typeof result === 'object') {
      response.send(messages.error);
    }
    else {
      response.send(result ? messages.true : messages.false);
    }
  })
  .catch(error => {
    response.send('Error (routes/members/post):\n' + error + '\n');
  });
});

module.exports = router;
