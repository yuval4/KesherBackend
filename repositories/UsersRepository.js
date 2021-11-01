const { User } = require("../models/UserModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const findUserById = async (id) => {
    return await User.findById(
        id,
        "name children schools role email changePasswordDate"
    )
        .populate("children", "name school profilePic")
        .populate("schools", "name")
        .lean();
};

const getUserByEmailAndPassword = async (email, password) => {
    return await User.findOne(
        { email: email, password: password },
        "name children schools role changePasswordDate"
    );
};

const addSchoolToUserById = async (userId, schoolId) => {
    return await User.findOneAndUpdate(
        {
            _id: new objectId(userId),
        },
        { $push: { schools: new objectId(schoolId) } }
    );
};

const changePassword = async (newPassword, userId) => {
    await User.findOneAndUpdate(
        {
            _id: new objectId(userId),
        },
        { password: newPassword, changePasswordDate: new Date() }
    );
};

const findUsersBySchoolId = async (schoolId) => {
    return await User.find(
        {
            schools: {
                $in: [objectId(schoolId)],
            },
        },
        "name profilePic role"
    );
};

const findAllStaffs = async () => {
    return await User.find(
        {
            role: {
                $in: ["Teacher", "Therapist"],
            },
        },
        "name profilePic role"
    );
};

module.exports = {
    findUserById,
    getUserByEmailAndPassword,
    addSchoolToUserById,
    changePassword,
    findUsersBySchoolId,
    findAllStaffs,
};
