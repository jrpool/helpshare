// This module routes all badge requests. Prefix: “/badges”.

const router = require('express').Router();
const queries = require('../controllers/badges');
const views = require('../views/api/badges');

// Handle requests to create badges.
router.post('/', (request, response) => {
  const {requester, member, role} = request.body;
  queries._create(requester, member, role)
  .then(result => {
    return response.send(views._create(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/badge/post):\n' + error + '\n');
  });
});

// Handle requests to delete badges.
router.delete('/', (request, response) => {
  const {requester, badge} = request.body;
  queries._delete(requester, badge)
  .then(result => {
    return response.send(views._delete(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/badge/delete):\n' + error + '\n');
  });
});

// Handle requests to update badges.
router.put('/', (request, response) => {
  const {requester, badge, property, value} = request.body;
  queries._update(requester, badge, property, value)
  .then(result => {
    return response.send(
      views._update(requester, property, result)
    );
  })
  .catch(error => {
    response.send('Error (routes/badge/put):\n' + error + '\n');
  });
});

module.exports = router;
