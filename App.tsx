import React, { useState, useEffect } from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Scene from "./components/scene";

// global style
// 既存テーマを拡張　引数に複数の拡張を列挙
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "#282c34",
        color: "#61dafb",
      },
    },
  },
});

const App: React.FC = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // componentDidMount
    // コンポーネントがマウントされた後すぐに実行
    let req: number;

    function step() {
      setPosition((currentPosition) => currentPosition + 1);
      // ブラウザにアニメーションしたいことを知らせ
      // 指定した関数を呼び->次の描画までに更新することを要求（たいてい1s60回）
      // reqはエントリーを一意に識別するためのもので値の推定はできない
      req = requestAnimationFrame(step);
    }

    req = requestAnimationFrame(step);

    return () => {
      // componentWillUnmount
      // コンポーネントのマウント解除時に実行　スケジュールをキャンセル
      cancelAnimationFrame(req);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Scene />
    </ChakraProvider>
  );
};

export default App;
