import bgm from "../assets/audios/bgm.mp3";
import move from "../assets/audios/move.mp3";
import hit from "../assets/audios/hit.mp3";
import drop from "../assets/audios/drop.mp3";
import clearLine from "../assets/audios/clear-line.mp3";
import gameover from "../assets/audios/gameover.mp3";
import otowared from "../assets/audios/otowared.mp3";
import otowaredBGM from "../assets/audios/hotta_de_yatter.mp3";
import tnbZugara from "../assets/audios/tnbZugara.mp3";
import tnbStop from "../assets/audios/tnbStop.mp3";
import tnbLever from "../assets/audios/tnbLever.mp3";


// BGM
export const audioBGM = new Audio(bgm);

// 手動移動/回転サウンド
const audioMove = new Audio(move);
audioMove.volume = 0.15;
export { audioMove };

// 移動失敗サウンド
export const audioHit = new Audio(hit);

// 自由落下サウンド
export const audioDrop = new Audio(drop);

// 行消去サウンド
export const audioClearLine = new Audio(clearLine);

// ゲームオーバーサウンド
export const audioGameover = new Audio(gameover);

// カウントダウンサウンド
const audioCountdown = new Audio(move);
audioCountdown.volume = 0.15;
export { audioCountdown };

// 音割れホッターBGM
export const audioOtowaredBGM = new Audio(otowaredBGM);

// 音割れホッターサウンド
const audioOtowared = new Audio(otowared);
audioOtowared.volume = 0.1; // 元音源がうるさすぎる
export { audioOtowared };

// tnb音源
export const audioTnbZugara = new Audio(tnbZugara);
export const audioTnbStop = new Audio(tnbStop);
export const audioTnbLever = new Audio(tnbLever);
