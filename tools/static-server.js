var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('build'));

app.get('*', function(req, res, next) {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.PORT || 3009);
