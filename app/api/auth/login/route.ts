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
    const email = String(data.email || "").toLowerCase().trim();
    // eslint-disable-next-line no-console
    console.log("Login attempt:", { email });

    if (!MONGODB_URI) {
      return new Response(JSON.stringify({ success: false, message: "Database configuration (MONGODB_URI) is missing." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const client = await getClient();
    if (!client) {
      return new Response(JSON.stringify({ success: false, message: "Failed to connect to the database." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const db = client.db();
    const users = db.collection("users");
    const user = await users.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const valid = await bcrypt.compare(String(data.password), String(user.password));
    if (!valid) {
      return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const token = jwt.sign({ userId: String(user._id), email: user.email }, JWT_SECRET, { expiresIn: "8h" });

    const safeUser = { name: user.name || null, email: user.email };
    return new Response(JSON.stringify({ success: true, token, user: safeUser }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Login handler exception:", err);
    return new Response(JSON.stringify({ success: false, message: "An unexpected server error occurred." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
