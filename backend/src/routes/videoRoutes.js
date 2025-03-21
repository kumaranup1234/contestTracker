const express = require('express');
const { putVideoLink } = require('../controllers/solutionController');
const router = express.Router();

router.get('/update-videos', putVideoLink);

module.exports = router;