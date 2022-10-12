const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/UsersRepository");
const { User } = require("../models/UserModel");
const mailService = require("../mail/MailService");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const { generatePassword } = require("../utils/utils");

const createNewUser = async (data, role) => {
  const password = generatePassword();

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
    email: data.email.trim().toLowerCase(),
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

const getUserById = async (id) => {
  return await UsersRepository.findUserById(id);
};

const getUserByEmail = async (email) => {
  return await UsersRepository.getUserByEmail(email.trim().toLowerCase());
};

const forgetPassword = async (email, phoneNumber) => {
  const isUser = await UsersRepository.getUserByEmail(
    email.trim().toLowerCase()
  );
  const newPassword = generatePassword();

  if (!isUser || isUser.phoneNumber !== phoneNumber) {
    throw new Error("user doesn't exist");
  } else {
    await mailService.sendResetPasswordMail(
      email.trim().toLowerCase(),
      `${isUser.name.first} ${isUser.name.last}`,
      newPassword
    );
    await UsersRepository.resetPassword(newPassword, isUser._id);
  }
};

const changePassword = async (passwords, user) => {
  const userInfo = await UsersRepository.findUserById(user.id);
  const isUser = await UsersRepository.getUserByEmail(
    userInfo.email.trim().toLowerCase()
  );

  if (!(await bcrypt.compare(passwords.oldPassword, isUser.password))) {
    throw new Error("user doesn't exist");
  } else if (
    String(user.id) === String(userInfo._id) &&
    passwords.newPassword === passwords.newPasswordAgain
  ) {
    if (
      !(await bcrypt.compare(passwords.newPassword, isUser.lastPassword)) &&
      passwords.newPassword !== passwords.oldPassword
    ) {
      const newPassSalt = await bcrypt.genSalt();
      passwords.newPassword = await bcrypt.hash(
        passwords.newPassword,
        newPassSalt
      );

      const oldPassSalt = await bcrypt.genSalt();
      passwords.oldPassword = await bcrypt.hash(
        passwords.oldPassword,
        oldPassSalt
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
  getUserById,
  getUserByEmail,
  changePassword,
  getUsersBySchoolId,
  getAllstaffs,
  addSchoolToUser,
  forgetPassword,
};
