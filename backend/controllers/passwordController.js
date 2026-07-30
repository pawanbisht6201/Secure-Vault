import Password from "../models/Password.js";

// ==========================
// Add New Password
// ==========================
export const addPassword = async (req, res) => {
  try {
    const { website, username, password, notes } = req.body;

    if (!website || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Website, Username and Password are required",
      });
    }

    const newPassword = await Password.create({
      website,
      username,
      password,
      notes,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Password Saved Successfully",
      data: newPassword,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get All Passwords
// ==========================
export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: passwords.length,
      data: passwords,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Update Password
// ==========================
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { website, username, password, notes } = req.body;

    const existingPassword = await Password.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!existingPassword) {
      return res.status(404).json({
        success: false,
        message: "Password not found",
      });
    }

    existingPassword.website = website || existingPassword.website;
    existingPassword.username = username || existingPassword.username;
    existingPassword.password = password || existingPassword.password;
    existingPassword.notes = notes || existingPassword.notes;

    await existingPassword.save();

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
      data: existingPassword,
    });
  } catch (error) {
    console.error("Update Password Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Password
// ==========================
export const deletePassword = async (req, res) => {
  try {

    const { id } = req.params;

    const password = await Password.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!password) {
      return res.status(404).json({
        success: false,
        message: "Password not found",
      });
    }

    await Password.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Password Deleted Successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};