const app = require('express')();
const JSONParser = require('body-parser').json({type: '*/*'});

app.use(JSONParser);

app.use('/:requester', (request, response, next) => {
  request.body.requester = request.params.requester;
  next();
});

app.use('/:requester', (request, response, next) => {
  next();
});

app.use('/:requester', require('./src/routes'));

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
