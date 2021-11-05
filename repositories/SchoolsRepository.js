const mongoose = require("mongoose");
const { School } = require("../models/SchoolModel");
const objectId = mongoose.Types.ObjectId;

// const findChildrenBySchoolId = async (id) => {
//     return await School.findById(id, "children")
//         .populate("children", "name profilePic active")
//         .lean();
// };

const findChildrenBySchoolId = async (id) => {
    return await School.findById(id, "children")
        .populate({
            path: "children",
            select: "name profilePic active",
            match: { active: { $gte: true } },
        })
        .lean();
};

const addIdChildToSchool = async (schoolId, childId) => {
    return await School.findOneAndUpdate(
        {
            _id: new objectId(schoolId),
        },
        { $push: { children: new objectId(childId) } }
    );
};

const findEventsBySchoolId = async (id) => {
    return await School.findById(id, "eventsBoard");
};

const addNewEventToSchoolById = async (schoolId, event) => {
    return await School.findOneAndUpdate(
        {
            _id: objectId(schoolId),
        },
        { $push: { eventsBoard: event } }
    );
};

module.exports = {
    findChildrenBySchoolId,
    addIdChildToSchool,
    findEventsBySchoolId,
    addNewEventToSchoolById,
};
