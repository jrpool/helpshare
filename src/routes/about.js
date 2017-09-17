// This module routes all about requests. Prefix: “/about”.

const router = require('express').Router();
const modelQueries = require('../model/queries');

// Handle requests to create relevances.
router.post('/', (request, response) => {
  const {requester, skill, domain} = request.body;
  modelQueries.createOne(requester, 'relevance', false, {skill, domain})
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/skills/post/re):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created relevance ${result}, `
            + `assigning skill ${skill} to domain ${domain}.\n`
          : `Member ${requester} may not create relevances.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/post/re):\n' + error + '\n');
  });
});

module.exports = router;
