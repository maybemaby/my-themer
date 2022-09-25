import { useSignal } from "@preact/signals";
import { HexAlphaColorPicker } from "react-colorful";
import styles from "./ColorPicker.module.css";
import { useKeyPress } from "../../hooks";
import { useCallback } from "preact/hooks";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { createRef, RefObject } from "preact";

interface Props {
  label: string;
  initialHex?: string;
  onChange?: (color: string) => void;
}

export const ColorPicker = ({ label, initialHex, onChange }: Props) => {
  const hexColor = useSignal(initialHex ?? "#ff0000");
  const showPicker = useSignal(false);
  const pickerRef = createRef<HTMLElement>();

  const handleEscape = useCallback((key?: KeyboardEvent["key"]) => {
    showPicker.value = false;
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    showPicker.value = false;
  }, []);

  useKeyPress("Escape", handleEscape);
  useOnClickOutside(pickerRef, handleClick);

  const handleChange = (c: string) => {
    hexColor.value = c;
    if (onChange) onChange(c);
  };

  return (
    <div class={styles.container}>
      <button
        onClick={() => (showPicker.value = !showPicker.value)}
        class={styles.color}
        style={{ background: hexColor.value }}
      ></button>
      <span className={styles.label}>
        <div>{label}</div>
        <div>{hexColor}</div>
      </span>
      {showPicker.value && (
        <div class={styles.picker} ref={pickerRef as RefObject<HTMLDivElement>}>
          <HexAlphaColorPicker color={hexColor.value} onChange={handleChange} />
          <input
            type="text"
            value={hexColor.value}
            onChange={(e) =>
              (hexColor.value = (e.target as HTMLInputElement).value)
            }
          />
        </div>
      )}
    </div>
  );
};
