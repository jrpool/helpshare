// This module routes all creation requests.

const router = require('express').Router();
const ops = require('../controllers');

router.get('/create/:object', (request, response) => {
  const params = request.body;
  queries._create(requester, skill, domain)
  .then(result => {
    return response.send(views._create(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/about/post):\n' + error + '\n');
  });
});

router.post('/', (request, response) => {
  const params = request.body;
  queries._create(requester, skill, domain)
  .then(result => {
    return response.send(views._create(requester, result));
  })
  .catch(error => {
    response.send('Error (routes/about/post):\n' + error + '\n');
  });
});

module.exports = router;
