const Visitor = require("../models/visitor");

const visitorController = {
  visitorMonitor: async (req, res) => {
    try {
      // Get visitor IP
      const ip =
        req.ip || // for proxies/load balancers
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

      // Optional: format IPv6 localhost to IPv4
      const formattedIp = ip === "::1" ? "127.0.0.1" : ip;

      // Check if visitor already exists
      let visitor = await Visitor.findOne({ visitorIp: formattedIp });

      if (visitor) {
        // Update count and visit date
        visitor.visitorCount += 1;
        visitor.visitedOn.push(Date.now());
        await visitor.save();
        return res.status(200).json({ message: "Visitor updated", visitor });
      } else {
        // Create new visitor
        const newVisitor = await Visitor.create({
          visitorIp: formattedIp,
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
