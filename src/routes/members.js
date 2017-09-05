const app = require('express')();
const memberModel = require('../model/members');

app.route('/:user/member')
.post((request, response) => {
  const {member, fullname, handle, phase, role} = request.body;
  memberModel.create(member, fullname, handle, phase, role)
  .then(newID => {
    console.log(`New member ${fullname} has ID ${newID}.`);
    response.send(JSON.stringify(newID));
  });
});
