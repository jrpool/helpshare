// This module routes all skill requests. Prefix: “/skills”.

const router = require('express').Router();
const modelQueries = require('../model/queries');

// Handle requests to create skills.
router.post('/', (request, response) => {
  const {requester, description} = request.body;
  modelQueries.createOne(requester, 'skill', false, {description})
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
  modelQueries.createOne(requester, 'domain', false, {description})
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

// Handle requests to create claims.
router.post('/claim', (request, response) => {
  const {requester, skill} = request.body;
  modelQueries.createOne(requester, 'claim', true, {member: requester, skill})
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
          ? `Member ${requester} created claim ${result} on skill ${skill}.\n`
          : `Member ${requester} may not create claims.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/post/claim):\n' + error + '\n');
  });
});

// Handle requests to delete claims.
router.delete('/claim', (request, response) => {
  const {requester, id} = request.body;
  modelQueries.deleteOne(requester, 'claim', true, id)
  .then(resultRows => {
    if (Array.isArray(resultRows)) {
      response.send(
        resultRows.length
          ? `Member ${requester} deleted claim ${id}.\n`
          : `Claim ${id} not found, so not deleted.\n`
      )
    }
    else if (resultRows === false) {
      response.send(`Member ${requester} may not delete claims.\n`);
    }
    else if (typeof resultRows === 'object') {
      response.send(
        'Error (routes/skills/delete/claim):\n'
        + `${result.message}\n${result.detail ? '\n' + result.detail : ''}\n`
      );
    }
    else {
      throw 'Unidentified error.';
    }
  })
  .catch(error => {
    response.send('Error (routes/skills/delete/claim):\n' + error + '\n');
  });
});

module.exports = router;
