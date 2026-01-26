import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Intelligence API Endpoints
  app.get("/api/intelligence/search", (req, res) => {
    const query = (req.query.q as string || "").toLowerCase();
    const mockRegulatoryData = [
      { id: 1, title: "EU AI ACT - Compliance v1.0", status: "SECURE", date: "2024-Q1", code: "REG-01" },
      { id: 2, title: "GDPR Data Processing Protocol", status: "ENCRYPTED", date: "2024-Q2", code: "REG-02" },
      { id: 3, title: "Cybersecurity Law Art. 56", status: "RESTRICTED", date: "2023-Q4", code: "REG-03" },
      { id: 4, title: "ISO/IEC 27001 ISMS Blueprint", status: "SECURE", date: "2024-Q1", code: "REG-04" },
    ];

    const results = mockRegulatoryData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query)
    );

    res.json(results);
  });

  app.get("/api/system/metrics", (_req, res) => {
    res.json({
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 30) + 40,
      bandwidth: "842.2 Mbps",
      latency: "12ms",
      uptime: "342:12:05",
      threatLevel: "LOW",
      shieldStatus: "98.4%",
      activeConnections: 12,
    });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
