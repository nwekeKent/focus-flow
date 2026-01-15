import { useState } from "react";
import { useAppContext, FontOption, ColorOption } from "@/context/app-context";

export const useSettings = (onClose: () => void) => {
  const { activeFont, activeColor, times, updateAllSettings } = useAppContext();

  // Local state: The "Staging Area"
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
    // Save everything to the global context and AsyncStorage at once
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
    // Config constants
    fonts: ["kumbh", "roboto", "mono"] as FontOption[],
    colors: ["red", "blue", "purple"] as ColorOption[],
  };
};
