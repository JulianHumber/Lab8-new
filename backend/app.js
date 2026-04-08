const express = require("express");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");

const authenticate = require("./middleware/auth");
const authorizeRoles = require("./middleware/role");

const app = express();
app.use(express.json());

app.use("/api", authRoutes);

app.use("/api/admin", authenticate, authorizeRoles("New admin"), adminRoutes);
app.use("/api/profile", authenticate, profileRoutes);

app.get("/", (req, res) => {
  res.send("API is now Running");
});

module.exports = app;