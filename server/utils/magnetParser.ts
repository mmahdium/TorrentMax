import type { MagnetUrl } from "../../shared/types/magnet";

export function parseMagnet(magnetUrl: string): MagnetUrl {
  if (!magnetUrl.startsWith("magnet:?")) {
    throw new Error('Invalid magnet URL: Must start with "magnet:?"');
  }

  const params = new URLSearchParams(magnetUrl.substring(8)); // Remove 'magnet:?' prefix
  const xt = params.get("xt");

  if (!xt) {
    throw new Error("Invalid magnet URL: Missing required xt parameter");
  }

  // Validate xt format (btih hash)
  const btihRegex = /^urn:btih:([a-fA-F0-9]{40}|[A-Z2-7]{32})$/;
  if (!btihRegex.test(xt)) {
    throw new Error("Invalid magnet URL: Invalid xt parameter format");
  }

  const magnet: MagnetUrl = {
    xt,
  };

  const dn = params.get("dn");
  if (dn) {
    magnet.dn = decodeURIComponent(dn);
  }

  const tr = params.getAll("tr");
  if (tr.length > 0) {
    magnet.tr = tr.map(decodeURIComponent);
  }

  const as = params.getAll("as");
  if (as.length > 0) {
    magnet.as = as.map(decodeURIComponent);
  }

  const xs = params.getAll("xs");
  if (xs.length > 0) {
    magnet.xs = xs.map(decodeURIComponent);
  }

  const kt = params.get("kt");
  if (kt) {
    magnet.kt = decodeURIComponent(kt);
  }

  const mt = params.get("mt");
  if (mt) {
    magnet.mt = decodeURIComponent(mt);
  }

  return magnet;
}

export function getMagnetUrl(magnet: MagnetUrl): string {
  const params = new URLSearchParams();
  Object.entries(magnet).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(`${key}`, v));
    } else {
      params.append(`${key}`, value);
    }
  });
  return `magnet:?${params.toString()}`;
}
