import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

import DoctorList from "../components/DoctorList";
import SlotSelector from "../components/SlotSelector";
import AppointmentForm from "../components/AppointmentForm";

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => {
        console.log("Doctors Data:", response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="title">Book an Appointment</h2>
      <DoctorList doctors={doctors} onSelect={setSelectedDoctor} />
      {selectedDoctor && (
        <div className="appointment-section">
          <label className="label">Select Date:</label>
          <input
            type="date"
            className="date-picker"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <SlotSelector
            doctorId={selectedDoctor._id}
            date={selectedDate}
            onSelect={(slot) => {
              if (!selectedDate) {
                alert("Please select a date before choosing a time slot.");
                return;
              }
              setSelectedSlot(slot);
              setFormOpen(true);
            }}
          />
        </div>
      )}
      <AppointmentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        doctorId={selectedDoctor?._id}
        date={selectedDate}
        time={selectedSlot}
      />
    </div>
  );
};

export default Home;
