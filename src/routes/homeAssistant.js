require('log-timestamp');
var express = require('express');
var homeAssistant = require('../homeAssistant');
var router = express.Router();

/* GET bulb. */
router.get('/available', async function(req, res, next) {
  await homeAssistant.setAvailable();
  res.render('control', { text: 'Marked as Available' });
});

router.get('/busy', async function(req, res, next) {
  await homeAssistant.setBusy();
  res.render('control', { text: 'Marked as busy' });
});

router.get('/away', async function(req, res, next) {
  await homeAssistant.setAway();
  res.render('control', { text: 'Marked as away' });
});


module.exports = router;
