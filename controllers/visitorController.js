const Visitor = require("../models/visitor");

const visitorController = {
  visitorMonitor: async (req, res) => {
    try {
      // Get visitor IP
      const ip =
        req.headers["x-forwarded-for"] || // for proxies/load balancers
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress ||
        null;

      if (!ip) {
        return res
          .status(400)
          .json({ error: "Unable to determine IP address" });
      }

      // Format IP (especially for IPv6 localhost)
      const formattedIp =
        ip.split(",")[0].trim() === "::1"
          ? "127.0.0.1"
          : ip.split(",")[0].trim();

      // Check if visitor already exists
      let visitor = await Visitor.findOne({ visitorIp: formattedIp });

      if (visitor) {
        // Update count and visit date
        visitor.visitorCount += 1;
        visitor.visitedOn.push(new Date()); // Date instead of timestamp
        await visitor.save();

        return res.status(200).json({ message: "Visitor updated", visitor });
      } else {
        // Create new visitor
        const newVisitor = await Visitor.create({
          visitorIp: formattedIp,
          visitedOn: [new Date()], // Init with array of first visit
        });

        return res
          .status(201)
          .json({ message: "New visitor added", visitor: newVisitor });
      }
    } catch (error) {
      console.error("Visitor tracking error:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getTotalVisitors: async (req, res) => {
    try {
      const totalVisitors = await Visitor.countDocuments(); // Assuming `Visitor` is your model
      res.status(200).json({ totalVisitors });
    } catch (error) {
      console.error("Error counting visitors:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getTotalVisits: async (req, res) => {
    try {
      const result = await Visitor.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$visitorCount" },
          },
        },
      ]);

      const totalCount = result[0]?.total || 0;
      res.status(200).json({ visitorsCount: totalCount });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to get visitor count", details: error.message });
    }
  },
};

module.exports = visitorController;
