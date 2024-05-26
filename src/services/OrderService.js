const Order = require("../models/OrderProduct");

const CreateOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, totalPrice, fullName, address, phone, user } = newOrder;
    try {
      const createOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          phone
        },
        paymentMethod,
        totalPrice,
        user: user
      });

      if (createOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createOrder,
        });
      }
    } catch (e) {
      reject({
        status: "ERR",
        message: "Đã xảy ra lỗi đặt hàng",
        error: e.message,
      });
    }
  });
};



const getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ user: userId });
    return orders;
  } catch (error) {
    console.error("Error retrieving orders by user ID:", error);
    throw error;
  }
};

module.exports = {
  CreateOrder,
  getOrdersByUserId,
};
