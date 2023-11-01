const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/db');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const [existingUser] = await User.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await User.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    res.send('register success');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [userRows] = await User.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = userRows[0];

    if (user && user.enabled) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      const payload = {
        user: {
          username: user.username,
          role: user.role
        }
      };

      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};



exports.loginLine = async (req, res) => {
  try {
    const { userId, displayName, pictureUrl } = req.body;

    const [existingUser] = await User.query("SELECT * FROM users WHERE username = ?", [userId]);

    if (existingUser.length > 0) {
      console.log("User Update !!!");
    } else {
      await User.query("INSERT INTO users (username, displayName, picture,password) VALUES (?, ?, ?,?)", [userId, displayName, pictureUrl,""]);
    }

    const payload = { user: { username: userId } };

    jwt.sign(payload, "jwtSecret", { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};







exports.currentUser = async (req, res) => {
  try {
    const username = req.user.username;

    // Query user data from the database
    const [userRows] = await User.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = userRows[0];

    const userWithoutSensitiveData = {
      username: user.username,
      role: user.role,
    };

    res.send(userWithoutSensitiveData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};




