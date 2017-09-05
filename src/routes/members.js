const router = require('express').Router();
const memberModel = require('../model/members');

router.post('/', (request, response) => {
  const {member, fullname, handle, phase, role} = request.body;
  return memberModel.create(member, fullname, handle, phase, role)
  .then(newID => {
    console.log('Result has type ' + typeof newID);
    const requester = request.body.requester;
    response.send(
      typeof newID === 'number'
      ? `Member ${requester} created member ${fullname} with ID ${newID}.\n`
      : `Error creating member ${fullname}.\n`
    );
  })
  .catch(error => {
    response.send('Error (routes/members/post): ' + error.message);
  });
});

module.exports = router;
