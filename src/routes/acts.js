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

// Handle requests to create calls.
router.post('/call', (request, response) => {
  const {requester, skill, location, comment} = request.body;
  actModel.createCall(requester, skill, location, comment)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/call):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} at location ${location} created `
            + `call ${result} on skill ${skill}`
            + `${comment ? ' (' + comment + ')' : ''}.\n`
          : `Member ${requester} may not create calls.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/call):\n' + error + '\n');
  });
});

// Handle requests to create offers.
router.post('/offer', (request, response) => {
  const {requester, call} = request.body;
  actModel.createOffer(requester, call)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/offer):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created offer ${result} on call ${call}.\n`
          : `Member ${requester} may not create offers.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/offer):\n' + error + '\n');
  });
});

// Handle requests to create assessments.
router.post('/assess', (request, response) => {
  const {requester, offer, rating, comment} = request.body;
  actModel.createOffer(requester, offer, rating, comment)
  .then(result => {
    if (typeof result === 'object') {
      response.send(
        'Error (routes/acts/post/assess):\n'
        + `${result.message}\n${result.detail}\n`
      );
    }
    else {
      response.send(
        result
          ? `Member ${requester} created assessment ${result} `
            + `with rating ${rating} on offer ${offer}`
            + `${comment ? ' (' + comment + ')' : ''}.\n`
          : `Member ${requester} may not create assessments.\n`
      );
    }
  })
  .catch(error => {
    response.send('Error (routes/acts/post/assess):\n' + error + '\n');
  });
});

module.exports = router;
