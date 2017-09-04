const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const memberModel = require('../model/members');

app.use(bodyParser);

app.post('/:user/member', (request, response, next) => {
  const {member, fullname, handle, phase, role} = request.body;
  memberModel.create(member, fullname, handle, phase, role)
  .then(newID => {
    console.log(`New member ${fullname} has ID ${newID}.`);
  })
  res.send(JSON.stringify(newID));
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
