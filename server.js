const express = require('express');
const app = express();
const JSONParser = require('body-parser').json({type: '*/*'});
const memberModel = require('./src/model/members');

app.use(JSONParser);

app.post('/:user/member', (request, response) => {
  const {member, fullname, handle, phase, role} = request.body;
  return memberModel.create(member, fullname, handle, phase, role)
  .then(newID => {
    console.log(`New member ${fullname} has ID ${newID}.`);
    response.send(JSON.stringify(newID));
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
