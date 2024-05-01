const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const exist = await prisma.user.findFirst({ where: { email: email } });

        if (exist) {
            return res.status(403).json({
                status: 403,
                message: "Email has already been used"
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptedPassword,
            }
        });

        delete user.password;

        return res.status(201).json({
            status: 201,
            message: "Created",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const user = await prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "invalid email or password!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: 400,
                message: "invalid email or password!"
            });
        }

        delete user.password;

        const token = jwt.sign(user, process.env.JWT_SECRET);

        return res.status(200).json({
            status: 200,
            message: "OK",
            data: { ...user, token }
        });
    } catch (error) {
        next(error);
    }
};

const whoami = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "OK",
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    whoami
};
