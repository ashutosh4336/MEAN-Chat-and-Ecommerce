const express = require('express');
const router = express.Router();
const { userAuth, adminAuth } = require('../middleware/check-auth');
const { saveOrders } = require('../controllers/orders');

router.post('/', userAuth, saveOrders);

module.exports = router;
