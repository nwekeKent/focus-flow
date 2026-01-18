import { useState } from "react";
import { useAppContext, FontOption, ColorOption } from "@/context/app-context";

export const useSettings = (onClose: () => void) => {
  const { activeFont, activeColor, times, updateAllSettings } = useAppContext();

  const [localTimes, setLocalTimes] = useState(times);
  const [localFont, setLocalFont] = useState<FontOption>(activeFont);
  const [localColor, setLocalColor] = useState<ColorOption>(activeColor);

  const updateLocalTime = (mode: keyof typeof times, value: number) => {
    setLocalTimes((prev) => ({
      ...prev,
      [mode]: value,
    }));
  };

  const applySettings = () => {
    updateAllSettings({
      times: localTimes,
      font: localFont,
      color: localColor,
    });
    onClose();
  };

  return {
    localTimes,
    localFont,
    localColor,
    setLocalFont,
    setLocalColor,
    updateLocalTime,
    applySettings,
    fonts: ["kumbh", "roboto", "mono"] as FontOption[],
    colors: ["red", "blue", "purple"] as ColorOption[],
  };
};
