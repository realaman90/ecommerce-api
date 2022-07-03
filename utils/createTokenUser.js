const { createJWT }  = require('./jwt');

const createUserToken = (userFrmDB) => {

    const user = { name: userFrmDB.name, userId: userFrmDB._id, role: userFrmDB.role };

    const token = createJWT({
        payload: user
    })

    return token;

};

module.exports = createUserToken