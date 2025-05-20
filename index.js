const cluster = require("cluster");
const os = require("os");
const express = require("express");

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Fork workers
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());

  // ✅ Add this /ping GET route
  app.get("/ping", (req, res) => {
    res.send("pong");
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

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
