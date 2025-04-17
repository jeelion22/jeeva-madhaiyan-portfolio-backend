const mongoose = require("mongoose");
const config = require("./utils/config");
const app = require("./app");

console.log("Connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = config.PORT || 3150;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
