// Avaliações reais da Petom Tur no Google (Places API — New).
//
// Configuração na Vercel (Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY  chave do Google Cloud com a "Places API (New)" ativada
//   GOOGLE_PLACE_ID        opcional — padrão: ficha "Petom turismo" em Tutóia
//
// A resposta fica em cache na CDN por 24h, então o Google é consultado
// poucas vezes por dia, independente do número de visitas.

const PLACE_ID_PADRAO = 'ChIJBeaK3w4L7gcR8xwrpM24xJY';

module.exports = async (req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || PLACE_ID_PADRAO;

  if (!key) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'not_configured' });
  }

  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri'
        }
      }
    );

    if (!r.ok) {
      console.error('Places API respondeu', r.status, await r.text());
      res.setHeader('Cache-Control', 'public, s-maxage=300');
      return res.status(502).json({ error: 'upstream' });
    }

    const p = await r.json();
    const reviews = (p.reviews || []).map((rv) => ({
      author: rv.authorAttribution?.displayName || '',
      authorUri: rv.authorAttribution?.uri || '',
      photo: rv.authorAttribution?.photoUri || '',
      rating: rv.rating || 0,
      text: (rv.text?.text || rv.originalText?.text || '').slice(0, 1200),
      when: rv.relativePublishTimeDescription || ''
    }));

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({
      rating: p.rating || 0,
      total: p.userRatingCount || 0,
      mapsUri: p.googleMapsUri || '',
      reviews
    });
  } catch (e) {
    console.error('Falha ao buscar avaliações', e);
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    return res.status(502).json({ error: 'fetch_failed' });
  }
};
