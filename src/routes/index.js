const router = require('express').Router();
const controllers = require('../controllers');

router.get(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)',
  (request, response) => {
    controllers.readAll(
      Number.parseInt(request.params.requester),
      request.params.object,
      response
    );
  }
);

router.get(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)/:id([1-9][0-9]{0,})',
  (request, response) => {
    controllers.read1Record(
      Number.parseInt(request.params.requester),
      request.params.object,
      Number.parseInt(request.params.id),
      response
    );
  }
);

router.get(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)/:property([a-z]+)',
  (request, response) => {
    controllers.read1Property(
      Number.parseInt(request.params.requester),
      request.params.object,
      request.params.property,
      response
    );
  }
);

router.post(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)',
  (request, response) => {
    controllers.create1Record(
      Number.parseInt(request.params.requester),
      request.params.object,
      request.body,
      response
    );
  }
);

router.put(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)/:id([1-9][0-9]{0,})/:property([a-z]+)',
  (request, response) => {
    controllers.update1Value(
      Number.parseInt(request.params.requester),
      request.params.object,
      Number.parseInt(request.params.id),
      request.params.property,
      request.body.value,
      response
    );
  }
);

router.delete(
  '/:requester([1-9][0-9]{0,})/:object([a-z]+)/:id([1-9][0-9]{0,})',
  (request, response) => {
    controllers.delete1Record(
      Number.parseInt(request.params.requester),
      request.params.object,
      Number.parseInt(request.params.id),
      response
    );
  }
);

router.use((request, response) => {
  controllers.error('Invalid request', response);
});

module.exports = router;
