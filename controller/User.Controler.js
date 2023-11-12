// controllers/userController.js
const User = require("../model/User.model");

async function createUser(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.json(newUser.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user." });
  }
}

async function findUserByUsername(req, res) {
  const { username } = req.params;
  try {
    const foundUser = await User.findOne({ where: { username } });
    if (foundUser) {
      res.json(foundUser.toJSON());
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding user." });
  }
}

async function updateUserPassword(req, res) {
  const { username } = req.params;
  const { newPassword } = req.body;
  try {
    const foundUser = await User.findOne({ where: { username } });
    if (foundUser) {
      await foundUser.update({ password: newPassword });
      res.json(foundUser.toJSON());
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
}

async function updateUser(req, res) {
  const { username } = req.params;
  const { email, newPassword } = req.body;
  try {
    const foundUser = await User.findOne({ where: { username } });
    if (foundUser) {
      // ตรวจสอบว่า email และ newPassword ไม่ใช่ค่าว่างก่อนที่จะทำการอัปเดต
      if (email || newPassword) {
        // ทำการอัปเดตข้อมูล
        const updatedUser = await foundUser.update({
          email: email || foundUser.email, // ใช้ค่าเดิมหากไม่ได้รับค่าใหม่
          password: newPassword || foundUser.password, // ใช้ค่าเดิมหากไม่ได้รับค่าใหม่
        });
        res.status(200).json(updatedUser.toJSON())
      } else {
        res
          .status(400)
          .json({ error: "Email or new password is required for update." });
      }
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
}

async function deleteUser(req, res) {
  const { username } = req.params;
  try {
    const foundUser = await User.findOne({ where: { username } });
    if (foundUser) {
      await foundUser.destroy();
      res.json({ message: "User deleted." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting user." });
  }
}
async function getAllUsers(req, res) {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  updateUserPassword,
  deleteUser,
  updateUser,
  getAllUsers,
};
