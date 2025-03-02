const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/mostrar', (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'lab1.html'));
})



module.exports = router;