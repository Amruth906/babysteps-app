const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.get("/", async (req, res) => {
  const appointments = await Appointment.find().populate("doctorId");
  res.json(appointments);
});

router.post("/", async (req, res) => {
  const { doctorId, date, duration, appointmentType, patientName, notes } =
    req.body;

  const existingAppointments = await Appointment.find({
    doctorId,
    date: new Date(date),
  });

  if (existingAppointments.length > 0) {
    return res.status(400).json({ error: "Time slot already booked" });
  }

  const newAppointment = new Appointment({
    doctorId,
    date,
    duration,
    appointmentType,
    patientName,
    notes,
  });

  await newAppointment.save();
  res.status(201).json(newAppointment);
});

module.exports = router;
