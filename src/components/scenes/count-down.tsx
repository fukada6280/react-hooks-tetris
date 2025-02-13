import React, { useEffect, useRef, useState } from "react";

import { Flex, Text } from "@chakra-ui/layout";

import { COUNT_DOWN_START } from "../../constants/index";
import { audioCountdown } from "../../constants/audios";

type Props = {
  onCountOvered: () => void;
  isSoundOn: boolean;
};

const messages = ["一度に沢山消すとスコアが増えるよ！がんばろう！"];

const CountDown: React.FC<Props> = ({ onCountOvered, isSoundOn }) => {
  const [count, setCount] = useState(COUNT_DOWN_START);
  const isSoundOnRef = useRef(isSoundOn);

  useEffect(() => {
    if (count <= 0) {
      onCountOvered();
    }
  }, [count]);

  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);
  
  useEffect(() => {
    let timer: number;

    function step() {
      if (isSoundOnRef.current) {
        audioCountdown.currentTime = 0;
        audioCountdown.play();
      }
      setCount((current) => current - 1);
      timer = window.setTimeout(step, 1000); //どのブラウザでも1000ms待ってstep()を実行
    }

    if (isSoundOnRef.current) {
      audioCountdown.currentTime = 0;
      audioCountdown.play(); // ﾋﾟｯって音を鳴らす
    }

    timer = window.setTimeout(step, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (count <= 0) {
    return null;
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column" w="100%">
      <Text fontSize="md" fontWeight="700" pb="2.0rem">
        {messages}
      </Text>
      <Text fontSize="5.0rem" fontWeight="700" pb="2.0rem">
        {count}
      </Text>
    </Flex>
  );
};

export default CountDown;
