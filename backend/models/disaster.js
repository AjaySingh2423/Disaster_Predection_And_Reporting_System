const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  type: {
    type: String, // flood, earthquake, landslide
    required: true,
  },

  severity: {
    type: String, // low, medium, high
    required: true,
  },

 

  location: {
    lat: Number,
    lng: Number,
  },

  //ADMIN CONTROL FLAGS
  isVerified: {
    type: Boolean,
    default: false, // user report = unverified
  },

  isActive: {
    type: Boolean,
    default: false, // not visible until admin activates
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("disaster", disasterSchema);