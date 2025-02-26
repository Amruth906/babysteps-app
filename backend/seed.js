require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const seedDatabase = async () => {
  await Doctor.deleteMany();
  await Appointment.deleteMany();

  const doctors = await Doctor.insertMany([
    {
      name: "Dr. John Doe",
      specialization: "Pediatrician",
      workingHours: { start: "09:00", end: "17:00" },
    },
    {
      name: "Dr. Jane Smith",
      specialization: "Dentist",
      workingHours: { start: "10:00", end: "18:00" },
    },
  ]);

  const appointments = [
    {
      doctorId: doctors[0]._id,
      date: new Date("2025-02-26T10:00:00.000Z"),
      duration: 30,
      appointmentType: "Checkup",
      patientName: "John Doe",
      notes: "First visit",
    },
    {
      doctorId: doctors[1]._id,
      date: new Date("2025-02-27T11:00:00.000Z"),
      duration: 30,
      appointmentType: "Dental Cleaning",
      patientName: "Jane Doe",
      notes: "Annual checkup",
    },
  ];

  await Appointment.insertMany(appointments);
  console.log("Database Seeded with Doctors & Appointments");
  mongoose.connection.close();
};

seedDatabase();
