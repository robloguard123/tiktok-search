export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { q } = req.query;
  if (!q) return res.status(400).json({ videos: [] });
  try {
    const r = await fetch(`https://tiktok-api23.p.rapidapi.com/api/search/video?keywords=${encodeURIComponent(q)}&count=20&cursor=0`, {
      headers: { 'x-rapidapi-key': 'e4d315dc46msh778af94d3b07518p1eda39jsn1d7cf16f61f7', 'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com' }
    });
    const data = await r.json();
    const videos = (data.data || []).map(i => ({
      url: `https://www.tiktok.com/@${i.author?.uniqueId}/video/${i.id}`,
      thumb: i.video?.cover || '',
      author: i.author?.uniqueId || '',
      desc: i.desc || '',
      likes: Number(i.stats?.diggCount || 0).toLocaleString()
    }));
    res.json({ videos });
  } catch (e) { res.status(500).json({ videos: [], error: e.message }); }
}
