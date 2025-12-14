import { config } from "@/config";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const apiKey = config.geolocationApiKey;

    if (!lat || !lng) {
      return Response.json({ error: "Missing coordinates" }, { status: 400 });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      return Response.json(
        { error: `Geocoding error: ${data.status}` },
        { status: 400 }
      );
    }

    const countryComp = data.results[0].address_components.find((c) =>
      c.types.includes("country")
    );

    return Response.json({
      country: countryComp?.short_name || "BD",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
