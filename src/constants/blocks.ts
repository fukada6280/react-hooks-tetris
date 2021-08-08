import { FIELD_SIZE } from "./index";

const BLOCK_COLOR_0 = "cyan.400";
const BLOCK_COLOR_1 = "blue.400";
const BLOCK_COLOR_2 = "orange.400";
const BLOCK_COLOR_3 = "yellow.400";
const BLOCK_COLOR_4 = "green.400";
const BLOCK_COLOR_5 = "purple.400";
const BLOCK_COLOR_6 = "red.400";

// 各ブロック（テトリミノ）の定数データを保持しているファイル
export const BLOCK_DEFAULT_PARAM = {
  columns: 4,
  rows: 4,
  x: Math.floor(FIELD_SIZE.rows / 2) - Math.floor(4 / 2), // 中央から排出される
  y: -4,
};

// BLOCKS[7種類][16マス分]のデータを格納
export const BLOCKS = [
  // Iミノ
  [
    null, null, null, null,
    null, null, null, null,
    BLOCK_COLOR_0, BLOCK_COLOR_0, BLOCK_COLOR_0, BLOCK_COLOR_0,
    null, null, null, null,
  ],

  // Lの逆
  [
    null, null, null, null,
    BLOCK_COLOR_1, null, null, null,
    BLOCK_COLOR_1, BLOCK_COLOR_1, BLOCK_COLOR_1, null,
    null, null, null, null,
  ],

  // Lミノ
  [
    null, null, null, null,
    null, null, BLOCK_COLOR_2, null,
    BLOCK_COLOR_2, BLOCK_COLOR_2, BLOCK_COLOR_2, null,
    null, null, null, null,
  ],

  // Oミノ
  [
    null, null, null, null,
    null, BLOCK_COLOR_3, BLOCK_COLOR_3, null,
    null, BLOCK_COLOR_3, BLOCK_COLOR_3, null,
    null, null, null, null,
  ],

  // zの逆
  [
    null, null, null, null,
    null, BLOCK_COLOR_4, BLOCK_COLOR_4, null,
    BLOCK_COLOR_4, BLOCK_COLOR_4, null, null,
    null, null, null, null,
  ],

  // Tミノ
  [
    null, null, null, null,
    null, BLOCK_COLOR_5, null, null,
    BLOCK_COLOR_5, BLOCK_COLOR_5, BLOCK_COLOR_5, null,
    null, null, null, null,
  ],

  // Zミノ
  [
    null, null, null, null,
    BLOCK_COLOR_6, BLOCK_COLOR_6, null, null,
    null, BLOCK_COLOR_6, BLOCK_COLOR_6, null,
    null, null, null, null,
  ],
];
