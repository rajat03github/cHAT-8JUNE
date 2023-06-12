const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register); //for REGISTER
router.post("/login", login); //for LOGIN
router.post("/setAvatar/:id", setAvatar); //for setting Avatar
router.get("/allusers/:id", getAllUsers); //getting all user detail to show

module.exports = router;
