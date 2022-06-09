const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('fs')

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
    const product = await Product.findOne({ _id: productId }).populate('reviews');
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
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload an Image')
    }
    const maxSize = 1024 * 1024;

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please Upload image below 1MB')
    }
    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    return res
        .status(StatusCodes.OK)
        .json({
            image: { src: `/uploads/${productImage.name}` }
        });

};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}