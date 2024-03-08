const express = require("express");
const router = express.Router();
const Playlist = require("../models/playList");
const Song = require("../models/song");

// CREATE a new playlist
router.post("/", async (req, res) => {
  try {
    const { name, songs } = req.body;

    // Step 2: Create new song documents
    const createdSongs = await Promise.all(
      songs.map(async (song) => {
        const newSong = new Song({
          title: song.title,
          artist: song.artist,
        });
        return await newSong.save();
      })
    );

    // Step 3: Get the ObjectIds of the created songs
    const songIds = createdSongs.map((song) => song._id);

    // Step 4: Create a new playlist with the song ObjectIds
    const newPlaylist = new Playlist({ name, songs: songIds });
    await newPlaylist.save();

    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ all playlists
router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs", "title artist");
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ a single playlist by ID
router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate(
      "songs",
      "title artist"
    );
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE a playlist by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, songs } = req.body;
    const playlistId = req.params.id;

    // Step 1: Create new song documents for new songs
    const createdSongs = await Promise.all(
      songs.map(async (song) => {
        const newSong = new Song({
          title: song.title,
          artist: song.artist,
        });
        return await newSong.save();
      })
    );

    // Step 2: Get the ObjectIds of the new songs
    const newSongIds = createdSongs.map((song) => song._id);

    // Step 3: Find the playlist by ID and update its name and songs
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { name, songs: newSongIds },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.json(updatedPlaylist);
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a playlist by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// router.put("/:id", async (req, res) => {
//   try {
//     const { name, songs } = req.body;

//     const updatedPlaylist = await Playlist.findByIdAndUpdate(
//       req.params.id,
//       { name, songs },
//       { new: true }
//     );
//     if (!updatedPlaylist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json(updatedPlaylist);
//   } catch (error) {
//     console.error("Error updating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const { name, songs } = req.body;

//     const newPlaylist = new Playlist({ name, songs });
//     await newPlaylist.save();
//     res.status(201).json(newPlaylist);
//   } catch (error) {
//     console.error("Error creating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const express = require("express");
// const router = express.Router();
// const Playlist = require("../models/playList");

// // CREATE a new playlist
// router.post("/", async (req, res) => {
//   try {
//     const { name, songs, createdBy } = req.body;
//     const newPlaylist = new Playlist({ name, songs, createdBy });
//     await newPlaylist.save();
//     res.status(201).json(newPlaylist);
//   } catch (error) {
//     console.error("Error creating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // READ all playlists
// router.get("/", async (req, res) => {
//   try {
//     const playlists = await Playlist.find().populate(
//       "songs createdBy",
//       "title username"
//     );
//     res.json(playlists);
//   } catch (error) {
//     console.error("Error fetching playlists:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // READ a single playlist by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const playlist = await Playlist.findById(req.params.id).populate(
//       "songs createdBy",
//       "title username"
//     );
//     if (!playlist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json(playlist);
//   } catch (error) {
//     console.error("Error fetching playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // UPDATE a playlist by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, songs, createdBy } = req.body;
//     const updatedPlaylist = await Playlist.findByIdAndUpdate(
//       req.params.id,
//       { name, songs, createdBy },
//       { new: true }
//     );
//     if (!updatedPlaylist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json(updatedPlaylist);
//   } catch (error) {
//     console.error("Error updating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // DELETE a playlist by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
//     if (!deletedPlaylist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json({ message: "Playlist deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Playlist = require("../models/playList");

// // CREATE a new playlist
// router.post("/", async (req, res) => {
//   try {
//     const { name, songs } = req.body;

//     const newPlaylist = new Playlist({ name, songs });
//     await newPlaylist.save();
//     res.status(201).json(newPlaylist);
//   } catch (error) {
//     console.error("Error creating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // READ all playlists
// // router.get("/", async (req, res) => {
// //   try {
// //     const playlists = await Playlist.find().populate(
// //       "songs createdBy",
// //       "title username"
// //     );
// //     res.json(playlists);
// //   } catch (error) {
// //     console.error("Error fetching playlists:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });
// router.get("/", async (req, res) => {
//   try {
//     const playlists = await Playlist.find().populate("songs", "title artist");
//     res.json(playlists);
//   } catch (error) {
//     console.error("Error fetching playlists:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // READ a single playlist by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const playlist = await Playlist.findById(req.params.id).populate(
//       "songs createdBy",
//       "title username"
//     );
//     if (!playlist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json(playlist);
//   } catch (error) {
//     console.error("Error fetching playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // UPDATE a playlist by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, songs } = req.body;

//     const updatedPlaylist = await Playlist.findByIdAndUpdate(
//       req.params.id,
//       { name, songs },
//       { new: true }
//     );
//     if (!updatedPlaylist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json(updatedPlaylist);
//   } catch (error) {
//     console.error("Error updating playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // DELETE a playlist by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
//     if (!deletedPlaylist) {
//       return res.status(404).json({ error: "Playlist not found" });
//     }
//     res.json({ message: "Playlist deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting playlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
