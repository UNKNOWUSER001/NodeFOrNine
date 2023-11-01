const jwt = require('jsonwebtoken');
const User = require('../model/db');


exports.auth = (req,res,next) =>{
  try{
      const token = req.headers["authtoken"]

      if(!token){
          return res.status(401).send("no token")
      }
      const decode = jwt.verify(token,'jwtSecret')

      req.user = decode.user
      next()

  }catch(err){
      console.log(err)
      res.status(401).send("Token Invalid")
  }
}




exports.adminCheck = async (req, res, next) => {
    try {
      const { username } = req.user;
  
      const query = "SELECT * FROM users WHERE username = ?";
      const [userRows] = await User.query(query, [username]);
  
      if (userRows.length === 0) {
        return res.status(401).send("User not found");
      }
      const adminUser = userRows[0];
  
      if (adminUser.role !== 'admin') {
        res.status(403).send("Admin Access denied");
      } else {
        next();
      }
  
    } catch (err) {
      console.log(err);
      res.status(401).send("Admin Access denied");
    }
  };


 