import React, { useState } from "react";
import DoctorList from "../components/DoctorList";
import SlotSelector from "../components/SlotSelector";
import AppointmentForm from "../components/AppointmentForm";
import { Container, Typography } from "@mui/material";

const Booking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  return (
    <Container>
      <Typography variant="h4">Book an Appointment</Typography>
      <DoctorList onSelect={setSelectedDoctor} />
      {selectedDoctor && (
        <>
          <Typography variant="h6">Select a Date:</Typography>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: "8px", margin: "10px 0", fontSize: "16px" }}
          />
          <SlotSelector
            doctorId={selectedDoctor._id}
            date={selectedDate}
            onSelect={(slot) => {
              setSelectedSlot(slot);
              setFormOpen(true);
            }}
          />
        </>
      )}
      <AppointmentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        doctorId={selectedDoctor?._id}
        date={selectedDate}
        time={selectedSlot}
      />
    </Container>
  );
};

export default Booking;
