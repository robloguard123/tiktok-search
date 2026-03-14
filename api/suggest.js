export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { q } = req.query;
  if (!q) return res.status(400).json({ words: [] });
  try {
    const params = new URLSearchParams({ keyword: q, scene: 'main', aid: '1988', app_language: 'ko', region: 'KR' });
    const r = await fetch(`https://www.tiktok.com/api/suggest/complete/?${params}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36', 'Referer': 'https://www.tiktok.com/', 'Accept-Language': 'ko-KR,ko;q=0.9' }
    });
    const data = await r.json();
    res.json({ words: (data.suggest_words || []).map(i => i.word) });
  } catch (e) { res.status(500).json({ words: [], error: e.message }); }
}
