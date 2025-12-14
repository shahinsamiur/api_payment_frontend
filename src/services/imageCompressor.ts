interface Options {
  quality?: number;
  width?: number;
  height?: number;
}

export async function imageCompressor(image: File, options: Options) {
  try {
    const formData = new FormData();
    formData.append("file", image);

    if (options.quality) formData.append("quality", options.quality.toString());
    if (options.width) formData.append("width", options.width.toString());
    if (options.height) formData.append("height", options.height.toString());

    const response = await fetch("/api/compress", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Compression failed");
    const compressedBlob = await response.blob();
    return compressedBlob;
  } catch (error) {
    throw error;
  }
}
