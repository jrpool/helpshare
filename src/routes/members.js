// This module routes all /:requester/members requests.

const router = require('express').Router();
const memberModel = require('../model/members');

router.post('/', (request, response) => {
  const {requester, fullname, handle, phase, role} = request.body;
  memberModel.create(requester, fullname, handle, phase, role)
  .then(newID => {
    response.send(
      typeof newID === 'number'
        ? `Member ${requester} created member ${fullname} with ID ${newID}.\n`
        : `Error creating member ${fullname}.\n`
    );
  })
  .catch(error => {
    response.send('Error (routes/members/post/[root]): ' + error.message);
  });
});

module.exports = router;
