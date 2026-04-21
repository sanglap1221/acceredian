import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || "replace_with_a_long_random_secret";

let cachedClient: MongoClient | null = null;
async function getClient() {
  if (!MONGODB_URI) return null;
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Log incoming signup data for debugging in Vercel function logs
    // eslint-disable-next-line no-console
    console.log("Signup Data:", { email: data.email });

    if (!MONGODB_URI) {
      return new Response(JSON.stringify({ success: false, message: "Database configuration (MONGODB_URI) is missing." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const client = await getClient();
    if (!client) {
      return new Response(JSON.stringify({ success: false, message: "Failed to connect to the database." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const db = client.db();
    const users = db.collection("users");

    const email = String(data.email || "").toLowerCase().trim();
    // eslint-disable-next-line no-console
    console.log("Signup attempt:", { email });

    const existing = await users.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ success: false, message: "User already exists" }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const hashed = await bcrypt.hash(String(data.password), 10);
    const result = await users.insertOne({ name: data.name, email, password: hashed, createdAt: new Date() });

    const token = jwt.sign({ userId: String(result.insertedId), email }, JWT_SECRET, { expiresIn: "8h" });

    return new Response(JSON.stringify({ success: true, token, user: { name: data.name, email } }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Signup handler exception:", err);
    return new Response(JSON.stringify({ success: false, message: "An unexpected server error occurred." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
