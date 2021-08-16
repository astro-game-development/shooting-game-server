const express = require('express');
const { createGame, getGame, shooting } = require('../controllers/game');
const router = express.Router();

router.get('/creategame', createGame);
router.get('/getgame/:id', getGame);
router.post('/shooting/:id', shooting);

module.exports = router;
