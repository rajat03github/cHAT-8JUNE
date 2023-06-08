const { register, login, setAvatar } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register); //for REGISTER
router.post("/login", login); //for LOGIN
router.post("/setAvatar/:id", setAvatar); //for setting Avatar

module.exports = router;
