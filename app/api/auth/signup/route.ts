export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Log incoming signup data for debugging in Vercel function logs
    // eslint-disable-next-line no-console
    console.log("Signup Data:", data);

    // If an external backend is configured, proxy the request there
    const backend = process.env.BACKEND_URL;
    if (backend) {
      const res = await fetch(`${backend.replace(/\/$/, "")}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      return new Response(JSON.stringify(json), { status: res.status, headers: { "Content-Type": "application/json" } });
    }

    // Default stub response (useful for demo deployments where the separate backend isn't deployed)
    return new Response(JSON.stringify({ success: true, message: "Signup received (stub)", user: { name: data.name, email: data.email } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Signup handler error:", err);
    return new Response(JSON.stringify({ success: false, message: "Invalid request" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
}
