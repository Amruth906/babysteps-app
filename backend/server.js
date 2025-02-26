const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

// Start the server on the specified port or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
