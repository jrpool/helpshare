const router = require('express').Router();
const skillModel = require('../model/skills');

// Handle requests to create locations.
router.post('/domains', (request, response) => {
  const {requester, description} = request.body;
  skillModel.createDomain(requester, description)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/skills/post/domains):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created domain ${result} (${description}).\n`
          : `Member ${requester} may not create domains.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/post/domains):\n' + error + '\n');
  });
});

module.exports = router;
