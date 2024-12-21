import express from "express";
import { getJson } from "serpapi";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const apiKey = process.env.VITE_SERPAPI_KEY;
if (!apiKey) {
  console.error("API Key not found. Ensure the .env file is set correctly.");
  process.exit(1);
}

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Timeout duration (in ms)
const TIMEOUT = 10000; // 10 seconds

async function getSearchParams(req, res, next) {
  const { searchQuery } = req.body;
  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }
  req.params = {
    engine: "google_shopping",
    q: searchQuery,
    hl: "en",
    gl: "us",
    api_key: apiKey,
  };
  next();
}

// Helper function to add a timeout to the API request
async function withTimeout(promise, timeout) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
}

async function searchResults(req, res) {
  try {
    const params = req.params;

    // Adding timeout to the SerpAPI request
    const data = await withTimeout(getJson("google_shopping", params), TIMEOUT);

    res.status(200).json(data.shopping_results || []);
  } catch (error) {
    console.error("Error fetching data from SerpAPI:", error.message || error);
    res.status(500).json({ error: "Failed to fetch data from SerpAPI" });
  }
}

// routes
app.post("/search", getSearchParams, searchResults);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
