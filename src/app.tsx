import "./app.css";
import { ThemeContext } from "./components/ThemeProvider/ThemeProvider";
import { ThemePicker } from "./components/ThemePicker/ThemePicker";
import { useContext, useMemo } from "preact/hooks";
import { useState } from "preact/hooks";

export function App() {
  const ctx = useContext(ThemeContext);
  const [pickedColors, setPickedColors] = useState<Record<string, string>>({});
  const css = useMemo(() => {
    let output = "";
    for (let [label, c] of Object.entries(pickedColors)) {
      output = output.concat(`${label}: ${c}\n`);
    }
    console.log(output);
    return output;
  }, [pickedColors]);

  const toggleTheme = () => {
    if (ctx.mode?.value == "material") {
      ctx.changeMode("tailwind");
    } else {
      ctx.changeMode("material");
    }
  };

  const handleChange = (label: string, color: string) => {
    setPickedColors({ ...pickedColors, [label]: color });
  };

  return (
    <>
      <h1>Themer</h1>
      <h2>Current Mode: {ctx.mode}</h2>
      <button onClick={() => toggleTheme()}>Change</button>
      <main>
        <ThemePicker onChange={handleChange} />
        <pre style={{ marginTop: "5rem" }}>
          CSS:
          <br />
          {css}
        </pre>
      </main>
    </>
  );
}
