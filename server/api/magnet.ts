import { getMagnetUrl, parseMagnet } from "~~/server/utils/magnetParser";
import { addTrackers, getTrackers } from "~~/server/utils/trackerHelper";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ magnet?: string }>(event);
  const magnetUrl = body?.magnet;

  if (!magnetUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing magnet URL",
    });
  }

  try {
    const maxedMagnet = addTrackers(
      parseMagnet(magnetUrl),
      await getTrackers()
    );
    return {
      totalTrackers: maxedMagnet.tr?.length,
      name: maxedMagnet.dn,
      id: maxedMagnet.xt.slice(9),
      maxedMagnet: getMagnetUrl(maxedMagnet),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Invalid magnet URL",
    });
  }
});
