const Order = require('../models/order');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');



const getAllOrders = async(req, res) => {
    res.send('Get all orders')
};
const getSingleOrder = async(req, res) => {
    res.send('Get single orders')
};
const getCurrentUserOrders = async(req, res) => {
    res.send('Current User orders')
};
const createOrder = async(req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');

    };
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee');

    };

    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product });
        if (!dbProduct) {
            throw new CustomError.NotFoundError(
                `No product with id: ${item.product}`
            );
        };
        const { name, price, image, _id } = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id
        };
        // add item to the order
        orderItems = [...orderItems, singleOrderItem];
        //calculate subtotal

        subtotal += item.amount * price
    }
    console.log(orderItems);
    console.log(subtotal)

    res.send('Theek hai bhai')


};
const updateOrder = async(req, res) => {
    res.send('update an order')
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
}