const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running",
    data: null,
  });
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
