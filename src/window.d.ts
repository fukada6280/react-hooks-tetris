// 既存のwindowオブジェクトのinterfaceを拡張
// もちろんaddEventListenerなどもともと持っているAPIも使用できる
interface Window {
    isMouseDown: boolean
    isKeyDown: {
        [key: string]: boolean
    }
}