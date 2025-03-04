const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controller')

router.get('/login', users_controller.get_login)
router.post('/login', users_controller.post_login)

module.exports = router;