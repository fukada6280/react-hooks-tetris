import React, { useCallback, useEffect, useRef, useState } from "react";

import { Flex, Kbd, Text } from "@chakra-ui/layout";

import GameRoot from "../game-root";

type Props = {
  onGameOvered: (finalScore: number) => void;
  isSoundOn: boolean;
};

const Stage: React.FC<Props> = ({ onGameOvered, isSoundOn }) => {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);

  // スコア変更の際に更新
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // スコアを更新する関数
  const addScore = useCallback((add: number) => {
    setScore((current) => current + add);
  }, []);

  // ゲームオーバーしたときの挙動 = handle
  const handleGameOvered = useCallback(() => {
    onGameOvered(scoreRef.current);
  }, []);

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w="100%"
      >

        <GameRoot
          onGameOvered={handleGameOvered}
          addScore={addScore}
          isSoundOn={isSoundOn}
          score={score}
        />

        <Text pt="1.0rem">
          ・左移動：<Kbd color="gray.700">←</Kbd>
          ・右移動：<Kbd color="gray.700">→</Kbd>
        </Text>
        <Text pt="1.0rem">
          ・下移動：<Kbd color="gray.700">↓</Kbd>
          ・右回転：<Kbd color="gray.700">space</Kbd>
        </Text>
      </Flex>
    </>
  );
};

export default Stage;
