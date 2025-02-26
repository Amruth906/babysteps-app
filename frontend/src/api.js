import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getDoctors = () => API.get("/doctors");
export const getAvailableSlots = (doctorId, date) =>
  API.get(`/doctors/${doctorId}/slots?date=${date}`);
export const getAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointments", data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
