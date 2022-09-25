import { useContext } from "preact/hooks";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { labels } from "../../constants";
import styles from "./ThemePicker.module.css";
import { useComputed } from "@preact/signals";
import { ColorPicker } from "../ColorPicker/ColorPicker";

interface Props {
  onChange?: (label: string, color: string) => void;
}

export const ThemePicker = ({ onChange }: Props) => {
  const ctx = useContext(ThemeContext);
  const cols = useComputed(() => {
    if (!ctx.mode) {
      return [];
    }
    return labels[ctx.mode.value];
  });
  const itemLabels = useComputed(() => {
    return Object.entries(cols.value).map(([_k, v]) => v);
  });

  const handleChange = (label: string, c: string) => {
    if (onChange) {
      onChange(label, c);
    }
  };

  return (
    <div class={styles.container}>
      {Object.keys(cols.value).map((key, idx) => (
        <div class={styles.category}>
          <h2>{key}</h2>
          {itemLabels.value[idx].map((label) => (
            <ColorPicker
              label={label}
              onChange={(c) => handleChange(label, c)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
