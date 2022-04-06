const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  activateOrDeactivateUserById,
} = require("../service/UserService");

router.get("/get-users", getAllUsers);

router.get("/get-user/:userId", getUserById);

router.post("/add-user", addUser);

router.post("/update-user/:userId", updateUserById);

router.post("/update-user/:userId", updateUserById);

router.get("/update-user-status/:userId", activateOrDeactivateUserById);

module.exports = router;
