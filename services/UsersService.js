const UsersRepository = require("../repositories/UsersRepository");
const { User } = require("../models/UserModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createNewUser = async (data, role) => {
    const password = Math.random().toString(36).substring(7);

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
    } else if (role === "Teacher") {
        user.schools.push(new objectId(data.schoolId));
    }
    user = await user.save();
    mailService.sendWelcomeMail(data.email, data.parentFirstName, password);
};

const getUserByEmailAndPassword = async (email, password) => {
    return await UsersRepository.getUserByEmailAndPassword(email, password);
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
