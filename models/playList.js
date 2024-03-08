const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
