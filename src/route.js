const express = require("express");
const router = express.Router();
const {adminAuth} = require("./middlewares/auth");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");

router.use("/", authRoutes);
router.use("/", adminAuth, profileRoutes);



module.exports = router;
