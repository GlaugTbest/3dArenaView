// All units in meters. Court follows official beach volleyball dimensions.
export const COURT_LENGTH = 16; // along X, net divides it at x = 0
export const COURT_WIDTH = 8; // along Z
export const LINE_WIDTH = 0.06;

export const NET_TOP_HEIGHT = 2.43;
export const NET_BAND_HEIGHT = 1.0;
export const POST_HEIGHT = 2.55;
export const POST_OFFSET = 0.6; // distance of posts beyond the sideline

export const FREE_ZONE_PAD_X = 4; // sand beyond the end lines
export const FREE_ZONE_PAD_Z = 4; // sand beyond the sidelines

export const SAND_HALF_X = COURT_LENGTH / 2 + FREE_ZONE_PAD_X; // 12
export const SAND_HALF_Z = COURT_WIDTH / 2 + FREE_ZONE_PAD_Z; // 8

export const FENCE_GAP = 2; // gap between sand edge and fence
export const FENCE_HALF_X = SAND_HALF_X + FENCE_GAP; // 14
export const FENCE_HALF_Z = SAND_HALF_Z + FENCE_GAP; // 10
export const FENCE_HEIGHT = 3.2; // tall ball-containment net, not just a low barrier
export const FENCE_KICK_WALL_HEIGHT = 0.4; // solid low band at the base of the net

export const ARENA_HALF_X = FENCE_HALF_X + 10;
export const ARENA_HALF_Z = FENCE_HALF_Z + 12;

export const COLORS = {
  sand: 0xd9c08a,
  sandDark: 0xc4a86c,
  line: 0xffffff,
  net: 0xffffff,
  netBorder: 0x1a2a3a,
  pole: 0x3a4450,
  poleDark: 0x232a33,
  fence: 0x8b95a3,
  fencePost: 0x555f6b,
  ground: 0x6b7280,
  groundEdge: 0x9aa3ad,
  camera: 0xff5f5f,
  cameraLens: 0x101418,
  conduit: 0xffb100,
  rack: 0x4ea1ff,
  rackBody: 0x1f2833,
  raspberry: 0x7fffab,
  raspberryBoard: 0x2f6b3e,
  button: 0xff3b3b,
  buttonBase: 0x2b2f36,
  led: 0x38ff6a,
  skin: 0xd9a679,
};
