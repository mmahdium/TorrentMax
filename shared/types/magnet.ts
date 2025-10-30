export type MagnetUrl = {
  /**
   * A magnet link is a string that contains all the information needed to download a torrent file.
   * It consists of several parameters that are separated by ampersands (&).
   * The parameters are:
   * - xt (exact topic): The hash of the torrent file.
   * - dn (display name): The name of the torrent file.
   * - tr (tracker URL): The URL of the tracker.
   * - as (acceptable source): The URL of the acceptable source.
   * - xs (exact source): The URL of the exact source.
   * - kt (keyword topic): The keyword topic.
   * - mt (magnet topic): The magnet topic.
   */
  xt: string;
  dn?: string;
  tr?: string[];
  as?: string[];
  xs?: string[];
  kt?: string;
  mt?: string;
}