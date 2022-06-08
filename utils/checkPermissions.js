const CustomError = require('../errors');

const checkPermissions = (requestUser, rescourceUserId) => {
    // console.log(requestUser);
    // console.log(rescourceUserId);
    // console.log(typeof rescourceUserId);
    if (requestUser.role === 'admin') return;
    if (requestUser.userId === rescourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError('Not Authorised to access this route')
}

module.exports = checkPermissions