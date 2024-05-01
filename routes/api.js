const router = require("express").Router();
const authController = require("../controllers/authControllers");
const { restrict } = require("../middlewares/middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/whoami", restrict, authController.whoami);

module.exports = router;
