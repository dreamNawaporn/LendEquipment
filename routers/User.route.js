// routers/userRouter.js
const express = require("express");
const userController = require("../controller/User.Controler");

const router = express.Router();

// Routes
router.post("/", userController.createUser);
router.get("/:username", userController.findUserByUsername);
router.get("/", userController.getAllUsers);
router.put("/:username", userController.updateUserPassword);
router.delete("/:username", userController.deleteUser);
router.patch("/:username", userController.updateUser);

module.exports = router;
