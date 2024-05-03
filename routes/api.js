const router = require("express").Router();
const authController = require("../controllers/authControllers");
const mediaController = require("../controllers/mediaControllers");
const { image } = require("../libs/mutler");
const { restrict } = require("../middlewares/middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/whoami", restrict, authController.whoami);

router.get("/users/photo", restrict, mediaController.getAllPhoto);
router.get("/users/photo/:id", restrict, mediaController.getPhoto);
router.post("/users/photo", restrict, image.single("file"), mediaController.uploadPhoto);
router.put("/users/photo/:id", restrict, image.single("file"), mediaController.updatePhoto);
router.delete("/users/photo/:id", restrict, mediaController.deletePhoto);

module.exports = router;
