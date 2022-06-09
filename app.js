//import node packages
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressFileUpload = require('express-fileupload')



//use express
const app = express();

//import database
const connectDB = require('./db/connect');

// router
const authRouter = require('./route/authRoutes');
const userRouter = require('./route/userRoutes');
const productRouter = require('./route/productsRoutes');
const reviewRouter = require('./route/reviewRoutes');
//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(expressFileUpload());

app.get('/', (req, res) => {

    res.send('Welcome to ecommerce API')
});
app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('Welcome to ecommerce API')
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

//Error Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





const port = process.env.PORT || 5000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}....`)
        });

    } catch (error) {
        console.log(error)
    }
}
start();