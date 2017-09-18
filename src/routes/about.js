// This module routes all about requests. Prefix: “/about”.

const router = require('express').Router();
const queries = require('../controllers/about');
const views = require('../views/api/about');

// Handle requests to create abouts.
router.post('/', (request, response) => {
  const {requester, skill, domain} = request.body;
  queries._create(requester, skill, domain)
  .then(result => {
    return response.send(views._create(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/about/post):\n' + error + '\n');
  });
});

// Handle requests to delete abouts.
router.delete('/', (request, response) => {
  const {requester, about} = request.body;
  queries._delete(requester, about)
  .then(result => {
    return response.send(views._delete(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/about/delete):\n' + error + '\n');
  });
});

// Handle requests to update abouts.
router.put('/', (request, response) => {
  const {requester, about, property, value} = request.body;
  queries._update(requester, about, property, value)
  .then(result => {
    return response.send(
      views._update(requester, property, result)
    );
  })
  .catch(error => {
    response.send('Error (routes/about/put):\n' + error + '\n');
  });
});

module.exports = router;
