import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";

import { FIELD_SIZE } from "../constants/index";
import {
  audioMove,
  audioHit,
  audioClearLine,
  audioGameover,
  audioOtowared,
  audioOtowaredBGM
} from "../constants/audios";

import {
  checkHit,
  clearFilledRows,
  createBlock,
  isGameOvered,
  getRotatedBlockData,
  setDrop2Field,
} from "../functions/blocks";
import DropBlock from "./drop-block";

interface Props {
  onGameOvered: () => void;
  addScore: (add: number) => void;
  isSoundOn: boolean;
  score: number;
}

export type Field = Array<string | null>;

const GameRoot: React.FC<Props> = ({ onGameOvered, addScore, isSoundOn, score }) => {
  // ゲームに必要なstate類
  // 一連の処理状態を管理するstate: 
  const [turnState, setTurnState] = useState({
    field: [...Array(FIELD_SIZE.rows * FIELD_SIZE.columns)], // 盤面の情報 はじめは全部null
    dropBlock: createBlock(), // 操作中のブロック情報を格納
    nextDropBlock: createBlock(), // 次の操作ブロック情報を格納
    isDropped: false, // 操作ブロックが落ちきったかどうか
  });

  // 書き換え可能な値を保持（毎回のレンダーで同じrefオブジェクトを返す）
  // .currentプロパティ内に値を保持しているためstateと似ているが
  // 中身が書き換わっても通知せず、再レンダーされないのが特徴
  // これをJSX内に記述すると変数に変更が加わった瞬間に表示が変わる
  const turnStateRef = useRef(turnState);
  const isSoundOnRef = useRef(isSoundOn);

  // 最新のstateを呼ぶための処理
  useEffect(() => {
    // 最初のマウント時と与えられた値に変化があった場合に実行
    turnStateRef.current = turnState;
  }, [turnState]);

  // サウンド変化があった際にのみ呼ばれる
  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);

  // BGM再生
  useEffect(() => {
    // 最初のマウント時と与えられた値に変化があった場合に実行
    if (isSoundOn) {
      if (audioOtowaredBGM.paused) {
        audioOtowaredBGM.loop = true;
        audioOtowaredBGM.play();
      } else {
        audioOtowaredBGM.loop = true;
        audioOtowaredBGM.currentTime = 0;
        audioOtowaredBGM.play();
      }
    } else {
      audioOtowaredBGM.pause();
    }

    return () => {
      // componentWillUnmount
      audioOtowaredBGM.pause();
    };
  }, [isSoundOn]);

  // 移動
  const handleOnMove: ({
    x,
    y,
    type,
  }: {
    x: number;
    y: number;
    type: "move" | "drop";
  }) => void = ({ x, y, type }) => {
    let movedBlockData = {
      ...turnStateRef.current.dropBlock,
      x: turnStateRef.current.dropBlock.x + x,
      y: turnStateRef.current.dropBlock.y + y,
    };

    // 移動出来るかチェック
    if (checkHit(movedBlockData, turnStateRef.current.field)) {
      if (isSoundOnRef.current) {
        audioHit.currentTime = 0;
        audioHit.play();
      }

      if (y > 0)
        setTurnState({
          ...turnStateRef.current, // 分割代入でisDroppedのみ更新する
          isDropped: true, // これだけ書くとその他の値を消してしまう
        });
      return;
    }

    // 手動移動時のみ効果音再生
    if (type === "move") {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioMove.currentTime = 0;
        audioMove.play();
      }
    }

    // 移動する
    setTurnState({
      ...turnStateRef.current,
      dropBlock: movedBlockData,
    });
  };

  // 回転（右）
  const handleOnRotate = useCallback(() => {
    const rotatedBlockData = getRotatedBlockData(
      turnStateRef.current.dropBlock
    );
    if (!checkHit(rotatedBlockData, turnStateRef.current.field)) {
      if (isSoundOnRef.current) {
        audioMove.currentTime = 0;
        audioMove.play();
      }
      setTurnState({
        ...turnStateRef.current,
        dropBlock: rotatedBlockData,
      });
    } else {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioHit.currentTime = 0;
        audioHit.play();
      }
    }
  }, []);

  // ドロップしたときに実行
  const handleOnDropped = useCallback(() => {
    console.log("Turn end");
    // ゲームオーバー判定
    if (isGameOvered(turnStateRef.current.dropBlock)) {
      console.log("Gameover", turnStateRef.current.dropBlock);

      if (isSoundOnRef.current) {
        audioGameover.currentTime = 0;
        audioOtowared.play();
      }

      onGameOvered();
      return;
    }
    console.log("Not gameover");

    // 消える行の数と消えたあとのフィールド取得・更新
    const { clearedLines, clearedField } = clearFilledRows(
      setDrop2Field(turnStateRef.current.dropBlock, turnStateRef.current.field)
    );

    // 成績更新
    addScore(clearedLines * 100);

    // 次のドロップを生成
    const newNextDropBlock = createBlock();

    if (clearedLines > 0) {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioClearLine.currentTime = 0;
        audioClearLine.play();
      }
    }
    setTurnState({
      ...turnStateRef.current,
      field: clearedField,
      dropBlock: turnStateRef.current.nextDropBlock,
      nextDropBlock: newNextDropBlock,
      isDropped: false,
    });
  }, []);

  // 次のターンが開始したときに呼ばれる
  // レンダー中に実行されるので副作用はNG、最適化のために使う感じ
  const handleNextTurn = useCallback(() => {
    console.log("Turn Start");
  }, []);

  return (
    <>
      {/* フィールドとnext,scoreの描画 */}
      <Flex>
      {/* フィールドの描画 */}
      <Box
        w={FIELD_SIZE.width}
        h={FIELD_SIZE.height}
        pos="relative"
        bgColor="gray.700"
        overflow="hidden"
      >
        <DropBlock
          dropBlockData={turnStateRef.current.dropBlock}
          onMove={handleOnMove}
          onRotate={handleOnRotate}
          isDropped={turnStateRef.current.isDropped}
          onDropped={handleOnDropped}
          nextTurn={handleNextTurn}
        />
        <SimpleGrid
          columns={FIELD_SIZE.rows}
          w="100%"
          h="100%"
          pos="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          {turnStateRef.current.field.map((color, i) => {
            return (
              <Box
                bgColor={color || "transparent"}
                key={i}
                width="100%"
                height="100%"
                rounded="sm"
              ></Box>
            );
          })}
        </SimpleGrid>

      </Box>
      
      <Box>
        {/* nextを表示する */}
        <Flex>
          <Text pb="1.0rem" fontSize="1.5rem" fontWeight="700" m={4}>
            Next:
          </Text>
          <SimpleGrid
            h="4rem"
            w={`${
              (4 * turnStateRef.current.nextDropBlock.columns) /
              turnStateRef.current.nextDropBlock.rows
            }rem`}
            columns={turnStateRef.current.nextDropBlock.columns}
          >
            {turnStateRef.current.nextDropBlock.data.map((color, i) => {
              return <Box bgColor={color ?? "transparent"} key={i} rounded="sm"></Box>;
            })}
          </SimpleGrid>
        </Flex>
        {/* scoreを表示する */}
        <Text pb="1.0rem" fontSize="1.5rem" fontWeight="700" m={4}>
          Score: {score}
        </Text>
      </Box>
    </Flex>
    </>
  );
};

export default GameRoot;
