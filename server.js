const app = require('express')();

// Execute body-parser on every valid POST, DELETE, or PUT request.

const bpMiddleware = [
  '/:requester([1-9]\\d{0,})/*',
  require('body-parser').json({type: '*/*'}),
  (request, response, next) => {
    request.body.requester = request.params.requester;
    next();
  }
];


app.post(...bpMiddleware);
app.delete(...bpMiddleware);
app.put(...bpMiddleware);

// Load ./src/routes.index.js on every valid query.
app.use('/:requester([1-9]\\d{0,})', require('./src/routes'));

// Listen for requests on port 3000 of localhost.
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
