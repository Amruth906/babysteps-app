# 🍼 BabySteps App

A web-based appointment booking system for doctors, built using **React (frontend)** and **Node.js + Express + MongoDB Atlas (backend)**.

## 🚀 Features

✅ Book appointments with doctors  
✅ View available time slots  
✅ Manage appointments (add & delete)  
✅ Responsive UI with Material-UI  
✅ MongoDB Atlas database integration  

---

## 📦 Tech Stack

### **Frontend**  
- React.js  
- Material-UI  
- Axios  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  

---

## 🛠️ **Installation & Setup**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Amruth906/babysteps-app.git
cd babysteps-app



Setup the Backend:
sh
Copy
Edit
cd backend
npm install
Configure MongoDB Atlas in .env
Create a .env file inside backend/ and add:

env
Copy
Edit
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=5000
Run the Backend
sh
Copy
Edit
npm start
or with Nodemon:

sh
Copy
Edit
npm run dev
Setup the Frontend:
sh
Copy
Edit
cd ../frontend
npm install
Run the Frontend
sh
Copy
Edit
npm start
🔗 API Endpoints
Method	Endpoint	Description
GET	/doctors	Fetch list of doctors
GET	/doctors/:id/slots?date=YYYY-MM-DD	Get available slots for a doctor
POST	/appointments	Book an appointment
GET	/appointments	View all appointments
DELETE	/appointments/:id	Cancel an appointment




