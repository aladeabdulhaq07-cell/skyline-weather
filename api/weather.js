
export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Weather service is not configured."
    });
  }

  const city = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");

    if (lat && lon) {
      url.searchParams.set("lat", lat);
      url.searchParams.set("lon", lon);
    } else {
      url.searchParams.set("q", city || "Lagos");
    }

    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Unable to get weather data."
    });
  }
}
