const OrderService = require("../services/OrderService");
const Order = require("../models/OrderProduct");

const CreateOrder = async (req, res) => {
  try {
    console.log('req', req.body)
    const {
      paymentMethod,
      totalPrice,
      fullName,
      address,
      phone,
      user
    } = req.body;
    if (
      !paymentMethod ||
      !totalPrice ||
      !fullName ||
      !address ||
      !phone ||
      !user
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "Missing required fields",
      });
    }

    const response = await OrderService.CreateOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: "An error occurred while creating the order",
      error: e.message,
    });
  }
};



const GetOrdersByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Không tìm thấy đơn hàng cho người dùng này',
        });
      }
  
      return res.status(200).json({
        status: 'OK',
        message: 'Đã tìm thấy đơn hàng',
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Đã xảy ra lỗi khi lấy thông tin đơn hàng',
        error: error.message,
      });
    }
  };
  

module.exports = {
  CreateOrder,
  GetOrdersByUserId,
};
