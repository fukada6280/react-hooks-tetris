import React from "react";

import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ArrowRightIcon } from "@chakra-ui/icons";

type Props = {
  onClickStart: () => void;
};

const Intro: React.FC<Props> = ({ onClickStart }) => {
  return (
    <>
      <Heading as="h1" pb="2.0rem">
        Tetris made with React
      </Heading>
      <Flex justifyContent="center" alignItems="center" flexDir="row" w="100%">
        <Button rightIcon={<ArrowRightIcon/>} colorScheme="gray" variant="outline" onClick={onClickStart}>
          Start
        </Button>
      </Flex>
    </>
  );
};

export default Intro;

