const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController')
router.post('/create', ReviewController.addReview);
router.get('/getall/:productId', ReviewController.getReviewsByProductIdController);

module.exports = router;

