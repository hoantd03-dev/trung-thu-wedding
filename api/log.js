export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {

  console.error("HIT /api/log", req.method);

  if (req.method === "POST") {
    console.error("DEVICE LOG:", JSON.stringify({
      ...req.body,
      ip: req.headers['x-forwarded-for'] || 'unknown',
      receivedAt: new Date().toISOString()
    }));

    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}