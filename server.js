const app = require('express')();
const bp = require('body-parser').json({type: '*/*'});

app.use(bp);

app.use(require('./src/routes'));

// Listen for requests on port 3000 of localhost.
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
