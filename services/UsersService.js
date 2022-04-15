const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/UsersRepository");
const { User } = require("../models/UserModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
var generator = require("generate-password");

const createNewUser = async (data, role) => {
    const password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        strict: true,
    });

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
    mailService.sendWelcomeMail(data.email, data.fisrtName, password);
};

const getUserByEmailAndPassword = async (email, password) => {
    const res = await UsersRepository.getUserByEmailAndPassword(
        email,
        password
    );
    if (res) {
        res.daysSinceChangePassword =
            (new Date() - new Date(res.changePasswordDate)) /
            (1000 * 24 * 60 * 60);
    }

    return res;
};

const getUserById = async (id) => {
    return await UsersRepository.findUserById(id);
};

const changePassword = async (passwords, user) => {
    const userInfo = await UsersRepository.findUserById(user.id);
    const isUser = await UsersRepository.getUserByEmail(userInfo.email);

    if (!(await bcrypt.compare(passwords.oldPassword, isUser.password))) {
        throw new Error("user doesn't exist");
    } else if (
        user.id == userInfo._id &&
        passwords.newPassword === passwords.newPasswordAgain
    ) {
        if (
            (await bcrypt.compare(
                passwords.newPassword,
                isUser.lastPassword
            )) &&
            passwords.newPassword !== passwords.oldPassword
        ) {
            const salt = await bcrypt.genSalt();
            passwords.newPassword = await bcrypt.hash(
                passwords.newPassword,
                salt
            );

            await UsersRepository.changePassword(
                passwords.oldPassword,
                passwords.newPassword,
                user.id
            );
        } else {
            throw new Error("password cannot be like old passwords");
        }
    } else {
        throw new Error("error");
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
