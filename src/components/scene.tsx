import React, { useCallback, useState } from "react";

// シーン遷移の中身のファイル
import Intro from "./scenes/intro";
import CountDown from "./scenes/count-down";
import Stage from "./scenes/stage";
import Result from "./scenes/result";
import { IconButton } from "@chakra-ui/button";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Box, Container, Flex } from "@chakra-ui/layout";

// いわゆるUnion型と呼ばれるenumに似た機能
type SceneName = "intro" | "countDown" | "stage" | "result";

const Scene = () => {
  const [scene, setScene] = useState<SceneName>("intro"); // 画面遷移を管理する
  const [score, setScore] = useState(0); // スコアを保持
  const [isSoundOn, setIsSoundOn] = useState(false); // サウンドのオンオフを保持

  // 第２引数が空 = 再実行されない
  const handleGameOvered = useCallback((finalScore: number) => {
    setScene("result");
    setScore(finalScore);
  }, []);

  // 第２引数が空 = 必要のない再計算がされない
  const toggleIsSoundOn = useCallback(() => {
    setIsSoundOn((current) => !current);
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
      h="100%"
      minH="100vh"
      p="2.0rem"
    >
      <Box textAlign="right" w="100%">
        <IconButton
          as="div"
          colorScheme="red"
          aria-label={isSoundOn ? "ミュートにする" : "サウンドをオンにする"}
          icon={isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          onClick={toggleIsSoundOn}
          opacity={isSoundOn ? 1 : 0.4}
          cursor="pointer"
        />
      </Box>

      <Container
        flex="1 1 auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        py="2.0rem"
      >
        {/*シーンごとに表示する画面を決める */}
        {scene === "intro" ? (
          <Intro onClickStart={() => setScene("countDown")} />
        ) : scene === "countDown" ? (
          <CountDown
            onCountOvered={() => setScene("stage")}
            isSoundOn={isSoundOn}
          />
        ) : scene === "stage" ? (
          <Stage onGameOvered={handleGameOvered} isSoundOn={isSoundOn} />
        ) : (
          scene === "result" && (
            <Result score={score} onClickRetry={() => setScene("countDown")} />
          )
        )}
      </Container>

      <Box textAlign="left" color="gray.400">
        - BGM音源提供 -
      </Box>
      <Box textAlign="center" color="gray.400">
        <a href="https://twitter.com/ego_momonga">momonga(@ego_momonga)</a>/
        <a href="https://twitter.com/HottaR13"> Hotta+R(@HottaR13)</a>
      </Box>

      <Box textAlign="left" color="gray.400">
        - 参考ソースコード -
      </Box>
      <Box textAlign="center" color="gray.400">
        <a href="https://github.com/hideyuk1-jp/react-hooks-tetris">hideyuk1-jp/react-hooks-tetris</a>
      </Box>
      <Box textAlign="center" color="gray.400">
        <a href="https://github.com/nabeliwo/react-game-sample">nabeliwo/react-game-sample</a>
      </Box>
    </Flex>
  );
};
export default Scene;
