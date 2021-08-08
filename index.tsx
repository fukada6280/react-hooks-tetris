import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

// grobalなwindowオブジェクトを操作する
/*
const setGlobalKeyDownEvent = () => {
    window.isKeyDown = {}
  
    window.addEventListener('keydown', (e) => {
      window.isKeyDown[`key_${e.key}`] = true
    })
  
    window.addEventListener('keyup', (e) => {
      window.isKeyDown[`key_${e.key}`] = false
    })
  }
  
  window.addEventListener('load', () => {
    setGlobalKeyDownEvent()
  })
  */
  