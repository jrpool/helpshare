const router = require('express').Router();
const commands = require('../controllers');

router.post('/:requester/create/:object([a-z]+)', (request, response) => {
  commands.create(
    request.requester, request.params.object, request.body, response
  );
});

// More routes to be added here.

router.use((request, response) => {
  commands.error(request, response);
});
