const router = require('express').Router();
const memberModel = require('../model/members');

router.post('/', (request, response) => {
  const {member, fullname, handle, phase, role} = request.body;
  return memberModel.create(member, fullname, handle, phase, role)
  .then(newID => {
    response.send(
      typeof newID === 'number'
        ? `Member ${request.params.user} created new member ${fullname} with ID ${newID}.\n`
        : 'Error creating a member.\n'
    );
  })
  .catch(error => {
    response.send('Error: ' + error.message);
  });
});

module.exports = router;
