// This module routes all act requests. Prefix: “/acts.

const router = require('express').Router();
const actModel = require('../model/acts');

// Handle requests to create locations.
router.post('/locations', (request, response) => {
  const {requester, description} = request.body;
  actModel.createLocation(requester, description)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/locations):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created location ${result} (${description}).\n`
          : `Member ${requester} may not create locations.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/locations):\n' + error + '\n');
  });
});

// Handle requests to create ratings.
router.post('/ratings', (request, response) => {
  const {requester, description} = request.body;
  actModel.createRating(requester, description)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/ratings):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created rating ${result} (${description}).\n`
          : `Member ${requester} may not create ratings.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/ratings):\n' + error + '\n');
  });
});

// Handle requests to create requests.
router.post('/ask', (request, response) => {
  const {requester, skill, location, comment} = request.body;
  actModel.createRequest(requester, skill, location, comment)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/ask):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created request ${result} on skill ${skill}.\n`
          : `Member ${requester} may not create requests.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/ask):\n' + error + '\n');
  });
});

module.exports = router;
