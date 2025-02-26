import React, { useState } from "react";
import { createAppointment } from "../api";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const AppointmentForm = ({ open, onClose, doctorId, date, time }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select a valid date and time!");
      return;
    }

    const convertTo24HourFormat = (time12h) => {
      const [time, modifier] = time12h.split(" ");
      let [hours, minutes] = time.split(":");

      if (modifier === "PM" && hours !== "12")
        hours = String(parseInt(hours, 10) + 12);
      if (modifier === "AM" && hours === "12") hours = "00";

      return `${hours}:${minutes}`;
    };

    const formattedTime = convertTo24HourFormat(time);
    const fullDateTime = new Date(`${date}T${formattedTime}:00`);

    if (isNaN(fullDateTime.getTime())) {
      alert("Invalid date or time! Please check your selection.");
      return;
    }

    console.log("Submitting appointment with:", {
      doctorId,
      date: fullDateTime,
      duration: 30,
      appointmentType,
      patientName,
    });

    createAppointment({
      doctorId,
      date: fullDateTime.toISOString(), // Ensure it's correctly formatted
      duration: 30,
      appointmentType,
      patientName,
    })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Appointment Type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
