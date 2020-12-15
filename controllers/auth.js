const Students = require('../models/students');
const Teachers = require('../models/teachers');
const {result_controller} = require('../middleware');
const {
    createTeacher, 
    getTeacherByUsernameAndPassword
} = require('./teachers');
const {
    createStudent,
    getStudentByUsernameAndPassword
} = require('./students');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signupUser = async (isTeacher, data) => {
    const model = (isTeacher ? Teachers : Students);

    try {
        const user = await model.findOne({
            $or: [
                {username: data.username},
                {email: data.email}
            ]
        }).exec();
        
        if (user) {
            return result_controller("USERNAME OR EMAIL ALREADY IN USE", null);
        }

        return await (
            isTeacher ? createTeacher(data) : createStudent(data)
        )
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

const signinUser = async (isTeacher, username, userpassword) => {
    try {
        const user = await (
            isTeacher ? 
            getTeacherByUsernameAndPassword(username, userpassword) :
            getStudentByUsernameAndPassword(username, userpassword)
        );

        if (user.data === null ) {
            return result_controller("UNAUTHORIZED", null);
        }

        let authUser = {
            'id': user.data._id,
            'username': user.data.username,
            'name': user.data.name,
            'email': user.data.email
        }

        const token = jwt.sign(
            { id: authUser._id},
            config.SECRET,
            {expiresIn: 86400}
        );

        authUser = {
            ...authUser,
            'token': token
        }

        return result_controller("OK", authUser);
    } catch (err) {
        console.error(err);
        return result_controller("ERROR", null);
    }
}

module.exports = {
    signupUser,
    signinUser
}