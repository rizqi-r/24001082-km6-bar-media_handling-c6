const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imagekit");
const path = require("path");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getAllPhoto = async (req, res, next) => {
    try {
        const jwtUserId = Number(req.user.id);

        if (!jwtUserId) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const photoExist = await prisma.post.findMany({
            where: {
                userId: jwtUserId
            }
        });

        if (!photoExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        photoExist.forEach((i) => {
            delete i.userId;
        });

        return res.status(200).json({
            status: 200,
            message: "OK",
            data: photoExist
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getPhoto = async (req, res, next) => {
    try {
        const params = Number(req.params.id);
        const jwtUserId = Number(req.user.id);

        if (!jwtUserId || !params) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const userExist = await prisma.user.findUnique({
            where: {
                id: jwtUserId
            }
        });

        if (!userExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const photoExist = await prisma.post.findUnique({
            where: {
                userId: jwtUserId,
                id: params
            }
        });

        if (!photoExist) {
            return res.status(404).json({
                status: 404,
                message: "Photo not found"
            });
        }

        delete photoExist.userId;

        return res.status(200).json({
            status: 200,
            message: "OK",
            data: photoExist
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const uploadPhoto = async (req, res, next) => {
    try {
        const jwtUserId = Number(req.user.id);
        const { title, description } = req.body;
        const file = req.file.buffer.toString("base64");
        console.log(jwtUserId);

        if (!jwtUserId || !file || !title || !description) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const userExist = await prisma.user.findUnique({
            where: {
                id: jwtUserId
            }
        });

        if (!userExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        try {
            const response = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: file
            });

            const photo = await prisma.post.create({
                data: {
                    title,
                    description,
                    photoUrl: response.url,
                    userId: jwtUserId
                }
            });

            delete photo.userId;

            return res.status(201).json({
                status: 201,
                message: "Created",
                data: photo
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const updatePhoto = async (req, res, next) => {
    try {
        const jwtUserId = Number(req.user.id);
        const params = Number(req.params.id);
        const { title, description } = req.body;
        const file = req.file?.buffer?.toString("base64");

        if (!jwtUserId) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const userExist = await prisma.user.findUnique({
            where: {
                id: jwtUserId
            }
        });

        if (!userExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const photoExist = await prisma.post.findUnique({
            where: {
                userId: jwtUserId,
                id: params
            }
        });

        if (!photoExist) {
            return res.status(404).json({
                status: 404,
                message: "photo not found"
            });
        }

        try {
            let response;
            if (file) {
                response = await imagekit.upload({
                    fileName: Date.now() + path.extname(req.file.originalname),
                    file: file
                });
            }

            const photo = await prisma.post.update({
                data: {
                    title: title || photoExist.title,
                    description: description || photoExist.description,
                    photoUrl: response ? response.url : photoExist.photoUrl
                },
                where: {
                    userId: jwtUserId,
                    id: params
                }
            });

            delete photo.userId;

            return res.status(201).json({
                status: 201,
                message: "Created",
                data: photo
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const deletePhoto = async (req, res, next) => {
    try {
        const jwtUserId = Number(req.user.id);
        const params = Number(req.params.id);

        if (!jwtUserId) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const photoExist = await prisma.post.findUnique({
            where: {
                userId: jwtUserId,
                id: params
            }
        });

        if (!photoExist) {
            return res.status(404).json({
                status: 404,
                message: "photo not found"
            });
        }

        const photoList = imagekit.listFiles();

        photoList.then(async (resImg) => {
            const deletePhoto = resImg.find((i) => i.url === photoExist.photoUrl)?.fileId;

            if (!deletePhoto) {
                return res.status(404).json({
                    status: 404,
                    message: "User photo not found in imagekit"
                });
            }

            try {
                await prisma.post.delete({
                    where: {
                        id: photoExist.id
                    }
                });

                imagekit.deleteFile(deletePhoto);

                return res.status(200).json({
                    status: 200,
                    message: "OK"
                });
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPhoto,
    getPhoto,
    uploadPhoto,
    updatePhoto,
    deletePhoto
};
