const Review = require('../models/review');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


const getAllReviews = async(req, res) => {
    const reviews = await Review.find({})
        .populate({
            path: 'product',
            select: 'name company price'
        })
        .populate({
            path: 'user',
            select: 'name'
        });

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
    //pagination later
};

const getSingleReview = async(req, res) => {
    const { id: productId } = req.params;
    const review = await Review.findOne({ _id: productId });
    if (!review) {
        throw new CustomError.NotFoundError(`No product fount with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({ review });
};


const createReview = async(req, res) => {
    const { product: productId } = req.body;
    const isValidProduct = await Product.findOne({ _id: productId });
    if (!isValidProduct) {
        throw new CustomError.NotFoundError(`No product fount with id: ${productId}`)
    }
    const alreadySubmited = await Review.findOne({
        product: productId,
        user: req.user.userId
    });
    if (alreadySubmited) {
        throw new CustomError.BadRequestError('Already Submited review')
    }


    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review })

};


const updateReview = async(req, res) => {

    const { id: productId } = req.params;
    const { rating, title, comment } = req.body
    const review = await Review.findOne({ _id: productId });
    if (!review) {
        throw new CustomError.NotFoundError(`No product fount with id: ${productId}`)
    }

    checkPermissions(req.user, review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();
    res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async(req, res) => {
    const { id: productId } = req.params;
    const review = await Review.findOne({ _id: productId });
    if (!review) {
        throw new CustomError.NotFoundError(`No product fount with id: ${productId}`)
    }

    checkPermissions(req.user, review.user);
    review.remove();
    res.status(StatusCodes.OK).json({ msg: 'Review Deleted' });
};
const getSingleProductReviews = async(req, res) => {
    const { id: productId } = req.params;
    const reviews = await Review.findOne({ product: productId });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}

module.exports = {
    getAllReviews,
    getSingleReview,
    createReview,
    updateReview,
    deleteReview,
    getSingleProductReviews,
}