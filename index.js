const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to wagmi-9000 API",
    timestamp: new Date().toISOString(),
    lang: "Node.js"
  });
});


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
    timestamp: new Date().toISOString(),
    lang: "Node.js"
  });
});


app.post("/wagmi", (req, res) => {
  const { a, b } = req.body || {};

  if (a === undefined && b === undefined) {
    return res.json({
      message: "wagmi",
      timestamp: new Date().toISOString(),
      lang: "Node.js"
    });
  }

  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    a < 0 ||
    b < 0 ||
    a + b > 100
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  return res.json({
    result: a + b,
    a,
    b,
    status: "success"
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
