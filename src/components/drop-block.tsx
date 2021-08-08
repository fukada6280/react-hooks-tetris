import React, { useEffect } from "react";

import { Box, SimpleGrid } from "@chakra-ui/layout";
import { DROP_SPEED, SINGLE_BLOCK_SIZE } from "../constants/index";
import { DropBlockData } from "../functions/blocks";
import { FaWindows } from "react-icons/fa";

interface Props {
  dropBlockData: DropBlockData; // 落下ブロックのデータ
  onMove: ({ x, y }: { x: number; y: number; type: "move" | "drop" }) => void; // キー入力を受け取る関数
  onRotate: () => void; // 回転するとき
  onDropped: () => void; // 落ちる時
  nextTurn: () => void; // 次のターン
  isDropped: boolean; // 落ちたかどうか
}

const DropBlock: React.FC<Props> = ({
  dropBlockData,
  onMove,
  onRotate,
  onDropped,
  nextTurn,
  isDropped,
}) => {
  // キー操作による移動、回転 いわゆる普通の実装方法をしている
  useEffect(() => {
    const onKeydown: (e: KeyboardEvent) => void = (e) => {
      switch (e.code) {
        case "Space":
          onRotate();
          break;
        case "ArrowRight":
        case "KeyD":
          onMove({ x: 1, y: 0, type: "move" });
          break;
        case "ArrowDown":
        case "KeyS":
          onMove({ x: 0, y: 1, type: "move" });
          break;
        case "ArrowLeft":
        case "KeyA":
          onMove({ x: -1, y: 0, type: "move" });
          break;
      }
    };
    addEventListener("keydown", onKeydown);

    return () => {
      removeEventListener("keydown", onKeydown);
    };
  }, []);

  /* 連続入力可能なキー操作による移動
  useEffect(() => {
    if (window.isKeyDown.key_d) {
      onMove({ x: 1, y: 0, type: "move" });
    } else if (window.isKeyDown.key_s) {
      onMove({ x: 0, y: 1, type: "move" });
    } else if (window.isKeyDown.key_a) {
      onMove({ x: -1, y: 0, type: "move" });
    } 
  }, [])
  */

  // 自然落下
  useEffect(() => {
    let req: number;
    let timer: number;

    const dropDown = () => {
      timer = window.setTimeout(() => {
        req = requestAnimationFrame(dropDown);
        onMove({ x: 0, y: 1, type: "drop" });
      }, 1000 / DROP_SPEED);
    };

    req = requestAnimationFrame(dropDown);

    return () => {
      cancelAnimationFrame(req);
      window.clearTimeout(timer);
    };
  }, []);

  // ドロップしきった場合
  useEffect(() => {
    if (isDropped) {
      // ドロップ中の状態からドロップしきった状態に変わった場合、ターン終了処理
      onDropped();
    } else {
      // ドロップしきった状態からドロップ中の状態に変わった場合は次のターン開始
      nextTurn();
    }
  }, [isDropped]);

  // 落ちるブロックの描画　
  return (
    <SimpleGrid
      columns={dropBlockData.columns}
      w={`${dropBlockData.columns * SINGLE_BLOCK_SIZE.width}px`}
      h={`${dropBlockData.rows * SINGLE_BLOCK_SIZE.height}px`}
      pos="absolute"
      top={`${dropBlockData.y * SINGLE_BLOCK_SIZE.height}px`}
      left={`${dropBlockData.x * SINGLE_BLOCK_SIZE.width}px`}
      zIndex="docked"
    >
      {dropBlockData.data.map((color, i) => {
        return (
          <Box
            bgColor={color ? color : "transparent"}
            key={i}
            width="100%"
            height="100%"
            rounded="sm"
          ></Box>
        );
      })}
    </SimpleGrid>
  );
};

export default DropBlock;
