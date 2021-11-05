const { Child } = require("../models/ChildModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getNameAndPicById = async (id) => {
    return await Child.findById(new objectId(id), "name profilePic active");
};

const updateChildProfilePicById = async (photo, childId) => {
    await Child.findOneAndUpdate(
        {
            _id: new objectId(childId),
        },
        { profilePic: photo }
    );
};

const updateChildActiveByChildId = async (id, isActive) => {
    return await Child.findOneAndUpdate(
        {
            _id: new objectId(id),
        },
        { active: isActive }
    );
};

module.exports = {
    getNameAndPicById,
    updateChildProfilePicById,
    updateChildActiveByChildId,
};
