var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Bharat Intern', message : req.query.message, req : req });
});

module.exports = router;
