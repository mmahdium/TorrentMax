import type { MagnetUrl } from "../../shared/types/magnet";

let cachedTrackers: string[] | null = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export async function getTrackers(): Promise<string[]> {
  const now = Date.now();

  if (cachedTrackers && now - lastFetched < CACHE_TTL) {
    return cachedTrackers;
  }

  const TRACKER_URLS = [
    "https://raw.githubusercontent.com/XIU2/TrackersListCollection/refs/heads/master/all.txt",
    "https://raw.githubusercontent.com/ngosang/trackerslist/refs/heads/master/trackers_all.txt",
  ];

  for (const url of TRACKER_URLS) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        const trackers = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "");

        // update cache
        cachedTrackers = trackers;
        lastFetched = now;
        return trackers;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // fallback: return cached even if stale, or empty
  return cachedTrackers ?? [];
}

export function addTrackers(magnet: MagnetUrl, trackers: string[]): MagnetUrl {
  if (trackers.length > 0) {
    // avoid duplicates
    const existing = new Set(magnet.tr ?? []);
    for (const tracker of trackers) {
      if (!existing.has(tracker)) {
        magnet.tr?.push(tracker);
      }
    }
  }
  return magnet;
}
