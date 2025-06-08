const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./db/db.js");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",              // for local development
  "https://blogsy-blogss.netlify.app"   // your deployed frontend
];
//MIDDLEWARE
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
); //cross origin requests
app.use(express.json()); //allow jsonz
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//ROUTES
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));

app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
