// This module routes all member requests. Prefix: “/members”.

const router = require('express').Router();
const modelQueries = require('../model/queries');

// Handle requests to create members.
router.post('/', (request, response) => {
  const {requester, fullname, handle, phase} = request.body;
  modelQueries.createOne(requester, 'member', false, {fullname, handle, phase})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/members/post):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created member ${result} (${handle}: ${fullname}).\n`
          : `Member ${requester} may not create members.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/members/post):\n' + error + '\n');
  });
});

// Handle requests to create phases.
router.post('/phases', (request, response) => {
  const {requester, description} = request.body;
  modelQueries.createOne(requester, 'phase', false, {description})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/members/post/phases):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created phase ${result} (${description}).\n`
          : `Member ${requester} may not create phases.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/members/post/phases):\n' + error + '\n');
  });
});

// Handle requests to change members’ properties.
router.put('/:property(fullname|handle|phase)', (request, response) => {
  const property = request.params.property;
  const {requester, member, newValue} = request.body;
  modelQueries.changeOne(
    requester, 'member', true, member, property, newValue
  )
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        `Error (routes/members/put/${property}):\n`
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} set the ${property} of member ${result} `
            + `to ${newValue}.\n`
          : `Member ${requester} may not assign members to phases.\n`
      );
    }
  })
  .catch(error => {
    response.send(`Error (routes/members/put/${property}):\n${error}\n`);
  });
});

module.exports = router;
