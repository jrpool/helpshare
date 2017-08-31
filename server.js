const express = require('express');
const app = express();

app.use(express.static(__dirname + '/src'));
app.use(require('./controllers'));
app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
