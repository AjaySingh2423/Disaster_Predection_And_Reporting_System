const {getUser} = require("../services/auth");
const User = require("../models/user");

async function restrictToLoggedInUserOnly(req,res,next){
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = getUser(token);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}


// middleware/auth.js (or same file)

async function restrictToAdminOnly(req, res, next) {
  try {
    // req.user already comes from your login middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //IMPORTANT: check role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  restrictToLoggedInUserOnly,
  restrictToAdminOnly
};


