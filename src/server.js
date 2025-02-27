const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const http = require("http");

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
const DOWNLOAD_DIR = path.join(__dirname, ".download");
const HTML_FILE_PATH = path.join(__dirname, "home.html");

const SESSION_EXPIRATION_TIME = 1000 * 60 * 30; // 30 minutes
const SESSION_CLEANUP_INTERVAL = 1000 * 60 * 5; // 5 minutes
const TOKEN_LENGTH = 16;

const FILES_TO_DOWNLOAD = {
  "showdown.min.js":
    "http://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js",
};

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

function downloadFile(filename, url) {
  const filePath = path.join(DOWNLOAD_DIR, filename);
  if (fs.existsSync(filePath)) return;

  const file = fs.createWriteStream(filePath);
  http
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () =>
        file.close(() => console.log(`${filename} downloaded`))
      );
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {});
      console.error(`Error downloading ${filename}:`, err.message);
    });
}

Object.entries(FILES_TO_DOWNLOAD).forEach(([filename, url]) =>
  downloadFile(filename, url)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files including showdown.min.js
app.use("/lib", express.static(DOWNLOAD_DIR));

const sessions = new Map();

app.get("/", (req, res) => {
  fs.readFile(HTML_FILE_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load home.html" });
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  if (req.body.password !== PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  sessions.set(token, { history: [], timestamp: Date.now() });
  res.json({ success: true, token });
  console.log(`[${token}] is created`);
});

app.post("/logout", (req, res) => {
  const token = req.body.token;
  sessions.delete(token);
  res.json({ success: true });
  console.log(`[${token}] is removed`);
});

app.post("/chat", async (req, res) => {
  const { message, token } = req.body;
  if (!sessions.has(token)) {
    console.log(`[${token}] is unauthorized`);
    return res.status(403).json({ error: "Unauthorized" });
  }
  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const session = sessions.get(token);
  session.history.push({ role: "user", content: message });

  console.log(`message: "${message}"`);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Keep responses brief." },
          ...session.history,
        ],
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const botReply = response.data.choices[0].message.content;
    session.history.push({ role: "assistant", content: botReply });
    res.json({ reply: botReply });
  } catch (error) {
    console.error("API request failed!", {
      details: error.response?.data || error.message,
    });
    res.status(500).json({ error: "API request failed" });
  }
});

setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.timestamp > SESSION_EXPIRATION_TIME) {
      console.log(`[${token}] is removed`);
      sessions.delete(token);
    }
  }
}, SESSION_CLEANUP_INTERVAL);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
