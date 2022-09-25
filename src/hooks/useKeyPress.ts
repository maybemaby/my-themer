import { useEffect } from "preact/hooks"

type Key = KeyboardEvent["key"]

export const useKeyPress = (key: Key, callback: (key?: Key) => void) => {

  useEffect(() => {
    const handlePress = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback(e.key);
      }
    }
    document.addEventListener("keydown", handlePress);

    return () => document.removeEventListener("keydown",handlePress);
  }, [key, callback])
}