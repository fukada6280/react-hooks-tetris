export const FIELD_SIZE = {
  rows: 14,
  columns: 20,
  width: 280, // 20*14
  height: 400, // 20*20
};

export const SINGLE_BLOCK_SIZE = {
  width: FIELD_SIZE.width / FIELD_SIZE.rows,
  height: FIELD_SIZE.height / FIELD_SIZE.columns,
};

// カウントダウン画面の秒数
export const COUNT_DOWN_START = 3;

// ドロップブロックの落ちるスピード
export const DROP_SPEED = 2;
