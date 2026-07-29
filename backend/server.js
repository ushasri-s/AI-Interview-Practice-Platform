const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
 
const app = express();
connectDB();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);



app.get('/',(req, res) => {
    res.send("AI Interview backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});