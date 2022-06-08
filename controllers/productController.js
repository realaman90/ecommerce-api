const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async(req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.OK).json({ product });
};

const getAllProducts = async(req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, count: products.length });
    //add sorting filtering, pagination etc..
};
const getSingleProduct = async(req, res) => {
    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new CustomError.NotFoundError(`Product with id: ${productId} not found`)
    }
    res.status(StatusCodes.OK).json({ product })

};
const deleteProduct = async(req, res) => {
    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new CustomError.NotFoundError(`Product with id: ${productId} not found`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ message: "Deleted" })
};
const updateProduct = async(req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId },
        req.body, { new: true, runValidators: true, });
    if (!product) {
        throw new CustomError.NotFoundError(`Product with id: ${productId} not found`)
    }
    res.status(StatusCodes.OK).json({ product })
};
const uploadImage = async(req, res) => {
    res.send('Get all the products')
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}