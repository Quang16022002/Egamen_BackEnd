const Review = require('../models/ReviewModel');

const addReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    const { product, user,  content, rating, images } = newReview;

    try {
  
        const createdReview = await Review.create({
          product,
          user,
          content,
          rating,
          images
        });

        if (createdReview) {
          resolve({
            status: "OK",
            message: "Review added successfully",
            data: createdReview,
          });
        } else {
          resolve({
            status: "ERR",
            message: "Failed to add review",
          });
        }
   
    } catch (error) {
      console.error("Error in addReview service:", error);
      reject({
        status: "ERR",
        message: "Error occurred while adding review",
        error: error.message || "Unknown error", 
      });
    }
  });
};
const getReviewsByProductId = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId }).populate('user');
    const reviewCount = reviews.length;
    if (reviews.length > 0) {
      return {
        status: "OK",
        message: "Reviews retrieved successfully",
        data: {
          count: reviewCount,
          reviews: reviews,
        },
      };
    } else {
      return {
        status: "OK",
        message: "No reviews found for this product",
        data: [],
      };
    }
  } catch (error) {
    console.error("Error in getReviewsByProductId service:", error);
    throw {
      status: "ERR",
      message: "Error occurred while retrieving reviews",
      error: error.message || "Unknown error",
    };
  }
};


module.exports = {
  addReview,
  getReviewsByProductId
};
