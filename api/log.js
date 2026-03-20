export default async function handler(req, res) {

  if (req.method === "POST") {
    const deviceInfo = {
      ...req.body,
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
      receivedAt: new Date().toISOString()
    };

    console.log("VIDEO DEBUG:", req.body);
    console.log("DEVICE LOG:", JSON.stringify(deviceInfo));
    
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: "Method not allowed" });

}