const app = require('express')();
const bp = require('body-parser').json({type: '*/*'});

/*
  Syntactically validate the requester ID in the request path. Make it,
  or null if invalid, the value of a property of the request.
*/
app.use((request, response, next) => {
  const requesterData = /^[1-9][0-9]*(?=\/)/.exec(request.path);
  if (requesterData) {
    request.requester = requesterData[0];
    if (['post', 'put'].includes(request.method)) {
      bp(request, response, next);
    }
  }
  else {
    request.requester = null;
  }
  require('./src/routes');
});

// Listen for requests on port 3000 of localhost.
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
