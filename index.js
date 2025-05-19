const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
