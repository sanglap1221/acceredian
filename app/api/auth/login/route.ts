export async function POST(req: Request) {
  try {
    const data = await req.json();
    // eslint-disable-next-line no-console
    console.log("Login Data:", { email: data.email });

    const backend = process.env.BACKEND_URL;
    if (backend) {
      const res = await fetch(`${backend.replace(/\/$/, "")}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      return new Response(JSON.stringify(json), { status: res.status, headers: { "Content-Type": "application/json" } });
    }

    // Stub response for demo purposes
    if (data.email && data.password) {
      return new Response(JSON.stringify({ success: true, token: "demo-token", user: { name: "Demo User", email: data.email } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Missing credentials" }), { status: 400, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Login handler error:", err);
    return new Response(JSON.stringify({ success: false, message: "Invalid request" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
}
