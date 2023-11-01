const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/db');


exports.listusers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [users] = await User.query(query);

    res.send(users);
  } catch  (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};



exports.readUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id = ?";
    const [userRows] = await User.query(query, [id]);

    // if (userRows.length === 0) {
    //   return res.status(404).send("User not found");
    // }

    // const user = userRows[0];

    res.send(userRows);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

  


exports.updateUsers = async (req, res) => {
  try {
    const { id, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const enPassword = await bcrypt.hash(password, salt);

    const query = "UPDATE users SET password = ? WHERE id = ?";
    await User.query(query, [enPassword, id]);

    res.send("User updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

  

exports.removeUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM users WHERE id = ?";
    await User.query(query, [id]);

    res.send("User deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

  

exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;

    const query = "UPDATE users SET enabled = ? WHERE id = ?";
    await User.query(query, [enabled, id]);

    res.send("User status updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

  


exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    const query = "UPDATE users SET role = ? WHERE id = ?";
    await User.query(query, [role, id]);

    res.send("User role updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

  