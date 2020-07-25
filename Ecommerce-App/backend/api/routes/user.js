const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/check-auth');

const {
  createUser,
  loginUserAndAdmin,
  isAdmin,
} = require('../controllers/user');

router.post('/create', createUser);
router.post('/login', loginUserAndAdmin);
router.get('/is-admin', userAuth, isAdmin);

module.exports = router;
