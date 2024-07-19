const express = require("express");
const app = express();

const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

// connect the redis server
(async () => {
  await client.connect();
  console.log("Redis connected");
})();

const VISITS_KEY = "visits";
// set default value for visits
client.set(VISITS_KEY, 0);

app.get("/", async (req, res) => {
  const visits = await client.get(VISITS_KEY);
  res.status(200).json({
    data: visits,
    success: true,
    message: "visits are fetched successfully",
  });

  // increment the visits count
  client.set(VISITS_KEY, parseInt(visits) + 1);
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
