const { createJWT }  = require('./jwt');

const createUserToken = (user) => {

    const token = createJWT({
        payload: user
    })

    return token;

};

module.exports = createUserToken