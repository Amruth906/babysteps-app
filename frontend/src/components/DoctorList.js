import React, { useEffect, useState } from "react";
import { getDoctors } from "../api";
import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";

const DoctorList = ({ onSelect }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {doctors.map((doctor) => (
        <ListItem button key={doctor._id} onClick={() => onSelect(doctor)}>
          <ListItemText primary={doctor.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default DoctorList;
