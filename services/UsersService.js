const UsersRepository = require("../repositories/UsersRepository");
const { User } = require("../models/UserModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
var RandExp = require("randexp");

const createNewUser = async (data, role) => {
    const password = new RandExp(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])([^\s-])(?=.*[a-z]).{8}$/
    ).gen();

    mailService.sendWelcomeMail(data.email, data.fisrtName, password);

    let user = new User({
        name: {
            first: data.fisrtName,
            last: data.lastName,
        },
        address: {
            city: data.city,
            street: data.street,
            number: data.number,
        },
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: password,
        role: role,
        active: true,
        profilePic: data.profilePic,
        birthDate: data.birthDate,
    });

    if (role === "Parent") {
        user.children.push(new objectId(data.childId));
    } else if (role === "Teacher" || role === "Therapist") {
        user.schools.push(new objectId(data.schoolId));
    }
    user = await user.save();
    mailService.sendWelcomeMail(data.email, data.parentFirstName, password);
};

const getUserByEmailAndPassword = async (email, password) => {
    const res = await UsersRepository.getUserByEmailAndPassword(
        email,
        password
    );
    res.daysSinceChangePassword =
        (new Date() - new Date(res.changePasswordDate)) / (1000 * 24 * 60 * 60);

    return res;
};

const getUserById = async (id) => {
    return await UsersRepository.findUserById(id);
};

const changePassword = async (passwords, user) => {
    const userInfo = await UsersRepository.findUserById(user.id);
    const isUser = await UsersRepository.getUserByEmailAndPassword(
        userInfo.email,
        passwords.oldPassword
    );

    if (
        isUser &&
        user.role === userInfo.role &&
        user.id == userInfo._id &&
        passwords.newPassword === passwords.newPasswordAgain
    ) {
        await UsersRepository.changePassword(passwords.newPassword, user.id);
    }
};

const getUsersBySchoolId = async (schoolId) => {
    return await UsersRepository.findUsersBySchoolId(schoolId);
};

const getAllstaffs = async () => {
    return await UsersRepository.findAllStaffs();
};

const addSchoolToUser = async (userId, schoolId) => {
    return await UsersRepository.addSchoolToUserById(userId, schoolId);
};

module.exports = {
    createNewUser,
    getUserByEmailAndPassword,
    getUserById,
    changePassword,
    getUsersBySchoolId,
    getAllstaffs,
    addSchoolToUser,
};
