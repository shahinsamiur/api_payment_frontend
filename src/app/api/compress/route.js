import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const height = parseInt(formData.get("height")) || 400;
    const width = parseInt(formData.get("width")) || 800;
    const quality = parseInt(formData.get("quality")) || 75;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Read file into a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Compress image with sharp
    const compressedBuffer = await sharp(inputBuffer)
      .resize({ width, height })
      .jpeg({ quality })
      .toBuffer();

    // Return the compressed image directly
    return new Response(compressedBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `inline; filename=compressed.jpg`,
      },
    });
  } catch (error) {
    console.error("Compression error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
