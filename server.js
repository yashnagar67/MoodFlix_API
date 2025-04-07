import express from "express";
import { lastscrp } from "./lastscrp.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/newdl", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "URL required" });

  const link = await lastscrp(videoUrl);
  if (link) {
    res.json({ finalDownloadLink: link });
  } else {
    res.status(500).json({ error: "Failed to fetch download link" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
