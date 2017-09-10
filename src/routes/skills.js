const router = require('express').Router();
const skillModel = require('../model/skills');

// Handle requests to create skills.
router.post('/', (request, response) => {
  const {requester, description} = request.body;
  skillModel.create(requester, description)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/skills/post):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created skill ${result} (${description}).\n`
          : `Member ${requester} may not create skills.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/post):\n' + error + '\n');
  });
});

// Handle requests to create domains.
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

// Handle requests to create relevances.
router.post('/re', (request, response) => {
  const {requester, skill, domain} = request.body;
  skillModel.createRelevance(requester, skill, domain)
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

// Handle requests to create skill claims.
router.post('/claim', (request, response) => {
  const {requester, skill} = request.body;
  skillModel.createClaim(requester, skill)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/skills/post/claim):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created claim ${result} on skill (${skill}).\n`
          : `Member ${requester} may not create claims.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/post/claim):\n' + error + '\n');
  });
});

module.exports = router;
