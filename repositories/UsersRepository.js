const { User } = require("../models/UserModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findUserById = async (id) => {
    return await User.findById(
        id,
        "name children schools role email changePasswordDate active"
    )
        .populate("children", "name school profilePic")
        .populate("schools", "name")
        .lean();
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
};

const addSchoolToUserById = async (userId, schoolId) => {
    return await User.findOneAndUpdate(
        {
            _id: new objectId(userId),
        },
        { $push: { schools: new objectId(schoolId) } }
    );
};

const changePassword = async (oldPassword, newPassword, userId) => {
    await User.findOneAndUpdate(
        {
            _id: new objectId(userId),
        },
        {
            password: newPassword,
            changePasswordDate: new Date(),
            lastPassword: oldPassword,
        }
    );
};

const findUsersBySchoolId = async (schoolId) => {
    return await User.find(
        {
            schools: {
                $in: [objectId(schoolId)],
            },
        },
        "name profilePic role active"
    );
};

const findAllStaffs = async () => {
    return await User.find(
        {
            role: {
                $in: ["Teacher", "Therapist"],
            },
        },
        "name profilePic role active"
    );
};

module.exports = {
    findUserById,
    getUserByEmail,
    addSchoolToUserById,
    changePassword,
    findUsersBySchoolId,
    findAllStaffs,
};
