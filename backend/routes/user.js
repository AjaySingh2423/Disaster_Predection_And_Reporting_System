const express = require("express");
const { restrictToLoggedInUserOnly,restrictToAdminOnly } = require("../middleware/auth");
const {
  handleCreateNewUser,
  handleLogin,
  handleHome,
  createDisaster, 
  getDisasters,
  getAllReports,
  deleteReport,
  verifyReport,
  changeStatus,
  getHistoryReports,
  getPrediction,
  handleAdmin,
} = require("../controllers/user");

const router = express.Router();

// Auth Routes
router.post("/register", handleCreateNewUser);
router.post("/login", handleLogin);


// Protected Route
router.get("/home", restrictToLoggedInUserOnly, handleHome);
router.post("/disaster", restrictToLoggedInUserOnly, createDisaster);
router.get("/disaster", getDisasters);

// 👨‍💼 Admin routes
router.get("/admin",
  restrictToLoggedInUserOnly,
  restrictToAdminOnly,
  getAllReports
);

router.delete("/:id",
  restrictToLoggedInUserOnly,
  restrictToAdminOnly,
  deleteReport
);

router.put("/verify/:id",
  restrictToLoggedInUserOnly,
  restrictToAdminOnly,
  verifyReport
);

router.put("/status/:id",
  restrictToLoggedInUserOnly,
  restrictToAdminOnly,
  changeStatus
);

router.get(
    "/adminAuth",
    restrictToLoggedInUserOnly,
    restrictToAdminOnly,
    handleAdmin
);


router.get("/history", getHistoryReports);
router.post("/predict", getPrediction);


module.exports = router;