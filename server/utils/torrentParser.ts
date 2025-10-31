import parseTorrent from "parse-torrent";
import type { MagnetUrl } from "../../shared/types/magnet";

export async function parseTorrentFileToMagnetUrl(
  file: Buffer
): Promise<MagnetUrl> {
  const parsed = await parseTorrent(file);

  const magnet: MagnetUrl = {
    xt: `urn:btih:${parsed.infoHash}`,
    dn: Array.isArray(parsed.name) ? parsed.name.join(" ") : parsed.name,
    tr: parsed.announce || [],
    xs: parsed.urlList || [],
    // as, kt, mt are rarely present in .torrent files, but you can add if needed
  };

  return magnet;
}
