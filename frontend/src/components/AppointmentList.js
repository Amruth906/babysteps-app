import React, { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../api";
import { List, ListItem, ListItemText, Button } from "@mui/material";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then((res) => setAppointments(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setAppointments(appointments.filter((app) => app._id !== id));
    });
  };

  return (
    <List>
      {appointments.map((appointment) => (
        <ListItem key={appointment._id}>
          <ListItemText
            primary={`${appointment.patientName} - ${appointment.appointmentType}`}
            secondary={appointment.date}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(appointment._id)}
          >
            Cancel
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AppointmentList;
