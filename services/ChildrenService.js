const ChildrenRepository = require("../repositories/ChildrenRepository");
const { Child } = require("../models/ChildModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const getChildNameAndPic = async (id) => {
    return await ChildrenRepository.getNameAndPicById(id);
};

const getChildrenNameAndPic = async (ids) => {
    let childrenList = [];
    for (i = 0; i < ids.lenlength; i++) {
        let child = await ChildrenRepository.getNameAndPicById(id);
        childrenList.push(child);
    }
    return childrenList;
};

const createNewChild = async (data) => {
    let child = new Child({
        name: {
            first: data.firstName,
            last: data.LastName,
        },
        birthDate: data.birthDate,
        school: new objectId(data.school),
        active: true,
    });
    child = await child.save();
    return child._id;
};

const updateChildPhoto = async (photo, childId) => {
    return await ChildrenRepository.updateChildProfilePicById(photo, childId);
};

const updateChildActive = async (id, isActive) => {
    await ChildrenRepository.updateChildActiveByChildId(id, isActive);
};

module.exports = {
    getChildNameAndPic,
    createNewChild,
    getChildrenNameAndPic,
    updateChildPhoto,
    updateChildActive,
};
