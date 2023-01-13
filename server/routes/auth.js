const controller = require("../controllers/authController");
const router = require("express-promise-router")();

router.post("/register", controller.register);
router.get("/user/:name", controller.user);
router.post("/login", controller.login);
router.get("logout/:id", controller.logout);

module.exports = router;
