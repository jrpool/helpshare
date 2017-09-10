const app = require('express')();

// Execute body-parser on every valid POST or DELETE request.
app.post(
  '/:requester/*',
  require('body-parser').json({type: '*/*'}),
  (request, response, next) => {
    request.body.requester = request.params.requester;
    next();
  }
);
app.delete(
  '/:requester/*',
  require('body-parser').json({type: '*/*'}),
  (request, response, next) => {
    request.body.requester = request.params.requester;
    next();
  }
);

// Load ./src/routes.index.js on every valid query.
app.use('/:requester', require('./src/routes'));

// Listen for requests on port 3000 of localhost.
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
