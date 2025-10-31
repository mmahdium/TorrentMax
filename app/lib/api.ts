interface MaxedMagnetResponse {
  totalTrackers: number;
  name?: string;
  id: string;
  maxedMagnet: string;
  error?: string;
}
export async function getMaxedMagnetUrl(
  magnet: string
): Promise<MaxedMagnetResponse> {
  try {
    const response = await fetch("/api/magnet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ magnet }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        totalTrackers: 0,
        id: "",
        maxedMagnet: "",
        error: errorData.message || `HTTP error! status: ${response.status}`,
      } as MaxedMagnetResponse;
    }

    return await response.json();
  } catch (err) {
    return {
      totalTrackers: 0,
      id: "",
      maxedMagnet: "",
      error: err instanceof Error ? err.message : "An unknown error occurred",
    } as MaxedMagnetResponse;
  }
}

export async function getMaxedMagnetFromTorrent(
  file: File
): Promise<MaxedMagnetResponse> {
  try {
    const form = new FormData();
    form.append("file", file);

    const response = await fetch("/api/torrent", {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        totalTrackers: 0,
        id: "",
        maxedMagnet: "",
        error: errorData.message || `HTTP error! status: ${response.status}`,
      } as MaxedMagnetResponse;
    }

    return await response.json();
  } catch (err) {
    return {
      totalTrackers: 0,
      id: "",
      maxedMagnet: "",
      error: err instanceof Error ? err.message : "An unknown error occurred",
    } as MaxedMagnetResponse;
  }
}
