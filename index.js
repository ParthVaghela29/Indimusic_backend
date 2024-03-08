// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const database = require("./config/database");
// const cors = require('cors');
// const port = process.env.PORT || 3000;
// const exphbs = require('express-handlebars');
// require('dotenv').config();

// // Routes
// const authRoutes = require('./routes/authenticateUser');

// // Middleware for parsing JSON and URL-encoded form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static('public'));

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/auth', authRoutes);

// //Initializing MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected successfully');

//     // Start the server once the MongoDB connection is established
//     app.listen(port, () => {
//       console.log("App listening on port: " + port);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB: ', error);
//   });

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authenticateUser");
const playlistRoutes = require("./routes/playLists"); // Include the new playlist routes

// Middleware for parsing JSON and URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/playlists", playlistRoutes); // Use the playlist routes

//Initializing MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start the server once the MongoDB connection is established
    app.listen(port, () => {
      console.log("App listening on port: " + port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });
