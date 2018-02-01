var express = require('express');
var router = express.Router();
var data = require('../services/data');

router.get('/calendar/:year/:month', (req, res, next) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  res.send({ events : data });
});

router.get('/upcoming', (req, res, next) => {
  res.send({ events : data });
});

module.exports = router;
