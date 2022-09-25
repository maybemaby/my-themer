import { Signal, signal, useSignal } from "@preact/signals";
import { createContext, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { labels } from "../../constants";

interface ThemeStore {
  mode: Signal<keyof typeof labels> | null;
  changeMode: (changeTo: keyof typeof labels) => void;
}

export const ThemeContext = createContext<ThemeStore>({
  mode: null,
  changeMode(changeTo) {
    return;
  },
});

function createThemeState() {
  const mode = signal<keyof typeof labels>("material");

  const changeMode = (changeTo: keyof typeof labels) => {
    mode.value = changeTo;
  };

  return { mode, changeMode };
}

const state = createThemeState();

export const ThemeProvider: FunctionComponent<{}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
};
