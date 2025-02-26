const express = require("express");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const { format, addMinutes, isBefore } = require("date-fns");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id/slots", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const { date } = req.query;
    const start = doctor.workingHours.start;
    const end = doctor.workingHours.end;

    let slots = [];
    let currentTime = new Date(`${date}T${start}`);
    const endTime = new Date(`${date}T${end}`);

    while (isBefore(currentTime, endTime)) {
      slots.push(format(currentTime, "HH:mm"));
      currentTime = addMinutes(currentTime, 30);
    }

    const bookedAppointments = await Appointment.find({
      doctorId: doctor._id,
      date: { $gte: new Date(date), $lt: new Date(date + "T23:59:59") },
    });

    bookedAppointments.forEach((app) => {
      slots = slots.filter((slot) => slot !== format(app.date, "HH:mm"));
    });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
