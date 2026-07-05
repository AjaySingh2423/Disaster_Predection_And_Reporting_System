const User = require("../models/user");
const axios = require("axios");
const { setUser } = require("../services/auth");
const Disaster = require("../models/disaster");
const bcrypt = require("bcrypt");



async function handleCreateNewUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = setUser(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function handleHome(req, res) {
  res.json({ user: req.user });
}

// ================= USER REPORT =================

async function createDisaster(req, res) {
  try {
    const { type, severity, location } = req.body;

    const disaster = await Disaster.create({
      type,
      severity,
      location,
      userId: req.user._id,
      isVerified: false,
      isActive: false,
    });

    res.json({ message: "Disaster added", disaster });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}

async function getDisasters(req, res) {
  //Only show verified + active (for map)
  const data = await Disaster.find({
    isVerified: true,
    isActive: true,
  });

  res.json(data);
}

// ================= ADMIN =================

async function getAllReports(req, res) {
  const data = await Disaster.find();
  res.json(data);
}

async function deleteReport(req, res) {
  await Disaster.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}

async function verifyReport(req, res) {
  const report = await Disaster.findById(req.params.id);
  report.isVerified = !report.isVerified;
  await report.save();
  res.json(report);
}

async function changeStatus(req, res) {
  const report = await Disaster.findById(req.params.id);
  report.isActive = !report.isActive;
  await report.save();
  res.json(report);
}

const getHistoryReports = async (req, res) => {
  try {
    const reports = await Disaster.find({
      isVerified: true
    }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getPrediction = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    //validation
   if (lat == null || lng == null) {
  return res.status(400).json({
    message: "Latitude and Longitude required",
  });
}

   const weatherRes = await axios.get(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
);

//correct path
const weather = weatherRes.data.current_weather;

if (!weather) {
  return res.status(500).json({ message: "Weather data not found" });
}

const input = {
  temp: weather.temperature,   
  wind: weather.windspeed,    

  // dummy values (since API doesn't give these)
  humidity: 70,
  pressure: 1000,
  rainfall_mm: 0
};

    //Call Python ML API
    const mlRes = await axios.post(
      `${process.env.ML_API}/predict`,
      input
    );

    // Send response to frontend
    res.json(mlRes.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ message: "Prediction failed" });
  }
};


// ================= EXPORT =================

module.exports = {
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
};