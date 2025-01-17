const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    image: [{ type: String, required: true }],
    price: { type: String, required: true },
    original_price: { type: String, required: true },
    discount: { type: Number },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    selectedColor: { type: String }, // Thêm trường selectedColor
    selectedSize: { type: String }   // Thêm trường selectedSize
});

const orderSchema = new mongoose.Schema({
    orderItems: [orderItemSchema], // Sử dụng schema của orderItem trong orderItems
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
