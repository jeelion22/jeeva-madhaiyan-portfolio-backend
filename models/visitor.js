const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  visitorCount: {
    type: Number,
    default: 1,
  },
  visitorIp: {
    type: String,
    unique: true,
  },
  visitedOn: {
    type: [Date],
    default: () => [Date.now()],
  },
});

module.exports = mongoose.model("Visitor", visitorSchema, "visitors");
