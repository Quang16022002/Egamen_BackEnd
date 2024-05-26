const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { authUserMiddleware } = require('../middleware/authMiddleware')



router.post('/create',OrderController.CreateOrder)
router.get('/user/:userId', OrderController.GetOrdersByUserId);

module.exports = router