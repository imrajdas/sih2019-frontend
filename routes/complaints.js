var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/registration', function(req, res, next) {
  res.render('complaint_registration', { title: 'Complaint Registration' });
});

router.get('/status', function(req, res, next) {
  res.render('complaint_status', { title: 'Complaint Status' });
});

router.get('/example', function(req, res, next) {
  res.render('example', { title: 'example' });
});
module.exports = router;
