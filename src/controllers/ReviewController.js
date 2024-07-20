const ReviewService = require("../services/ReviewService");

const addReview = async (req, res) => {
  const { productId, userId, content, rating, images } = req.body;

  try {
    const reviewData = {
      product: productId,
      user: userId,
      content,
      rating,
      images
    };

    const response = await ReviewService.addReview(reviewData);
    if (response.status === "OK") {
      res.status(201).json({ message: response.message, review: response.data });
    } else {
      res.status(400).json({ message: response.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

const getReviewsByProductIdController = async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await ReviewService.getReviewsByProductId(productId);
    res.status(result.status === "OK" ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addReview,
  getReviewsByProductIdController
};
