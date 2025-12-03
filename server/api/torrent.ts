export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form || form.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  // Find the torrent file part (e.g., name="file")
  const filePart = form.find((p) => p.name === "file");
  if (!filePart || !filePart.data) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing torrent file",
    });
  }

  // Basic validation
  if (!filePart.filename?.toLowerCase().endsWith(".torrent")) {
    throw createError({
      statusCode: 400,
      statusMessage: "File must be a .torrent",
    });
  }
  // Size validation
  if (filePart.data.length > 1e6) {
    throw createError({
      statusCode: 400,
      statusMessage: "File size must be less than 1MB",
    });
  }

  const bytes = filePart.data;

  const parsed = await parseTorrentFileToMagnetUrl(bytes);

  const maxedMagnet = addTrackers(parsed, await getTrackers());
  return {
    totalTrackers: maxedMagnet.tr?.length,
    name: maxedMagnet.dn,
    id: maxedMagnet.xt.slice(9),
    maxedMagnet: getMagnetUrl(maxedMagnet),
  };
});
