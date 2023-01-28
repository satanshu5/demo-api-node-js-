const express = require('express')
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const authenticate = require('../middleware/authenticate')

router.post('/users', AuthController.register)
router.post('/login', AuthController.login)
router.get('/users/:username',authenticate, AuthController.show)
router.put('/users/follow/:followId',authenticate, AuthController.follow)
router.put('/users/unfollow/:id',authenticate, AuthController.Unfollow)

module.exports = router
