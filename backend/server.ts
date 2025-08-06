import express from "express";
import cors from "cors";
import { auth } from "./lib/auth";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use((req, res, next) => {
  if (req.url.startsWith("/api/auth")) {
    // Create the proper request object for Better Auth
    const request = new Request(`http://localhost:3000${req.url}`, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: ["GET", "HEAD"].includes(req.method)
        ? null
        : JSON.stringify(req.body),
    });

    auth
      .handler(request)
      .then(async (response) => {
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });

        res.status(response.status);

        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const json = await response.json();
          res.json(json);
        } else {
          const text = await response.text();
          res.send(text);
        }
      })
      .catch((error) => {
        console.error("Better Auth error:", error);
        res.status(500).json({ error: "Authentication error" });
      });
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
