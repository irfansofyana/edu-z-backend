const SecretCode = require('../models/secretcode');
const {result_controller} = require('../middleware');

const addSecretCode = async (data) => {
    try {
        const created = await SecretCode.create(data);
        return result_controller("OK", created);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const getSecretCode = async (email) => {
    try {
        const data = await SecretCode.findOne({email: email}).exec();
        return result_controller("OK", data);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    addSecretCode,
    getSecretCode
}