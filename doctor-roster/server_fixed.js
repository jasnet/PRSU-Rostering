const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const rosterRoutes = require("./routes/rosterRoutes_fixed");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/doctor_roster")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Doctor Roster API Running (fixed)");
});

app.use("/api/rosters", rosterRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000 (fixed)");
});
