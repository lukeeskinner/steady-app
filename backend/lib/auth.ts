import dotenv from "dotenv";
import path from "path";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("Environment variables:", {
  MONGODB_URI: process.env.MONGODB_URI ? "Present" : "Missing",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "Present" : "Missing",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "Present" : "Missing",
});

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not defined in environment variables");
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is not defined in environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("steady");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
});

export type Session = typeof auth.$Infer.Session;
