const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
// title: { type: String, required: true },
// artist: { type: String, required: true },
// duration: { type: Number, required: true }, // Duration in seconds
// album: { type: String },
// genre: { type: String },
// Add more fields as needed
