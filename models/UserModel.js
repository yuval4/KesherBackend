const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const nameSchema = new Schema({
    first: String,
    last: String,
});

const adressSchema = new Schema({
    city: String,
    street: String,
    number: Number,
});

const userSchema = new Schema({
    name: {
        type: nameSchema,
        required: true,
    },
    address: {
        type: adressSchema,
    },
    // "Parent", "Teacher", "Admin", "Therapist"
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Parent", "Teacher", "Therapist"],
    },
    profilePic: { type: String },
    birthDate: { type: Date },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schools: [{ type: Schema.Types.ObjectId, ref: "School" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Children" }],
    changePasswordDate: { type: Date, default: new Date(0) },
    lastPassword: { type: String, default: "" },
    active: { type: Boolean, required: true, default: true },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }

        throw Error("incorrect password");
    }

    throw Error("incorrect email");
};

const User = new mongoose.model("User", userSchema);
module.exports = { User };
