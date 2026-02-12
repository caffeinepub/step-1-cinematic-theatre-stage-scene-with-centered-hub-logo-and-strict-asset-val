/**
 * Centralized list of required asset filenames.
 * All references to these assets should use relative paths (no leading slash).
 */
export const REQUIRED_ASSET_FILENAMES = [
  'logo2-1.png',
  'jacques-johnson-1.png',
  'kream-kuntree-1.png',
  'rl-stafford-1.png'
] as const;

export type RequiredAssetFilename = typeof REQUIRED_ASSET_FILENAMES[number];
