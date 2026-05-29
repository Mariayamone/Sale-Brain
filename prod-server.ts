import express from "express";
import path from "path";
import app from "./server";

const PORT = 3000;
const distPath = path.join(process.cwd(), "dist");

app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Sales Brain AI] production server on http://localhost:${PORT}`);
});
