const jwt = require("jsonwebtoken");
const { validationMethod } = require("../utils/constants");
const UsersRepository = require("../repositories/UsersRepository");

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        user = await UsersRepository.findUserById(user.id);
        user.id = user._id;
        user.daysSinceChangePassword =
            (new Date() - new Date(user.changePasswordDate)) /
            (1000 * 24 * 60 * 60);

        req.user = user;

        next();
    });
};

const verifyTeacher = (req, res, next) => {
    if (req.user.role === "Teacher") {
        next();
    } else {
        return res.sendStatus(401);
    }
};

const verifyUser = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.sendStatus(401);
        }
    };
};

const verifyDaysSinceChangePassword = (req, res, next) => {
    if (req.user.daysSinceChangePassword < 90 && req.user.active) {
        next();
    } else {
        return res.sendStatus(401);
    }
};

const validateSchema = (schema, validationType) => {
    return async (req, res, next) => {
        if (validationMethod.body === validationType) {
            try {
                await schema.validateAsync(req.body);
                next();
            } catch (err) {
                res.sendStatus(400);
            }
        } else if (validationMethod.param === validationType) {
            try {
                await schema.validateAsync(req.param);
                next();
            } catch (err) {
                res.sendStatus(400);
            }
        } else {
            console.log("forgot to pass validation type");
        }
    };
};

module.exports = {
    generateAccessToken,
    authenticateToken,
    verifyUser,
    verifyDaysSinceChangePassword,
    validateSchema,
};
