export const config = {
    api: { bodyParser: { sizeLimit: '1mb' } }
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const type = req.body.type || 'unknown';
        console.error(`[${type.toUpperCase()}]`, JSON.stringify(req.body));
        return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: "Method not allowed" });
}