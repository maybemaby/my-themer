import "./app.css";
import { ThemeContext } from "./components/ThemeProvider/ThemeProvider";
import { ThemePicker } from "./components/ThemePicker/ThemePicker";
import { useContext } from "preact/hooks";
import { useSignal } from "@preact/signals";

export function App() {
  const ctx = useContext(ThemeContext);
  const pickedColors = useSignal<Record<string, string>>({});

  const toggleTheme = () => {
    if (ctx.mode?.value == "material") {
      ctx.changeMode("tailwind");
    } else {
      ctx.changeMode("material");
    }
  };

  const handleChange = (label: string, color: string) => {
    pickedColors.value[label] = color;
  };

  return (
    <>
      <h1>Themer</h1>
      <h2>Current Mode: {ctx.mode}</h2>
      <button onClick={() => toggleTheme()}>Change</button>
      <main>
        <ThemePicker onChange={handleChange} />
      </main>
    </>
  );
}
