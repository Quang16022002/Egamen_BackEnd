const Review = require('../models/ReviewModel');

const addReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    const { product, user,  content, rating, images } = newReview;

    try {
      // // Kiểm tra xem người dùng đã nhận xét sản phẩm này chưa
      // const existingReview = await Review.findOne({ product: product, user:user});

      // if (existingReview) {
      //   resolve({
      //     status: "ERR",
      //     message: "User has already reviewed this product",
      //   });
      // } else {
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
      // }
    } catch (error) {
      console.error("Error in addReview service:", error); // In ra lỗi chi tiết để debug
      reject({
        status: "ERR",
        message: "Error occurred while adding review",
        error: error.message || "Unknown error", // Cung cấp thông tin lỗi chi tiết hơn
      });
    }
  });
};

module.exports = {
  addReview,
};
