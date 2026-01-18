import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FontOption = "mono" | "kumbh" | "roboto";
export type ColorOption = "red" | "blue" | "purple";
export type ModeOption = "pomodoro" | "short break" | "long break";

interface TimeSettings {
  pomodoro: number;
  "short break": number;
  "long break": number;
}

interface AppContextType {
  activeFont: FontOption;
  activeColor: ColorOption;
  activeMode: ModeOption;
  times: TimeSettings;
  handleModeChange: (mode: ModeOption) => void;
  loaded: boolean;
  updateAllSettings: (settings: {
    times: TimeSettings;
    font: FontOption;
    color: ColorOption;
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_TIMES: TimeSettings = {
  pomodoro: 25,
  "short break": 5,
  "long break": 15,
};

const PREFERENCES_KEY = "@focusflow_user_prefs";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeFont, setActiveFont] = useState<FontOption>("kumbh");
  const [activeColor, setActiveColor] = useState<ColorOption>("red");
  const [activeMode, setActiveMode] = useState<ModeOption>("pomodoro");
  const [times, setTimes] = useState<TimeSettings>(DEFAULT_TIMES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem(PREFERENCES_KEY);
        if (savedPrefs) {
          const { font, color, times: savedTimes } = JSON.parse(savedPrefs);
          if (font) setActiveFont(font);
          if (color) setActiveColor(color);
          if (savedTimes) setTimes(savedTimes);
        }
      } catch (e) {
        console.error("Failed to load preferences", e);
      } finally {
        setLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const handleModeChange = useCallback((mode: ModeOption) => {
    setActiveMode(mode);
  }, []);

  const updateAllSettings = useCallback(
    async (settings: {
      times: TimeSettings;
      font: FontOption;
      color: ColorOption;
    }) => {
      setTimes(settings.times);
      setActiveFont(settings.font);
      setActiveColor(settings.color);

      try {
        const dataToSave = JSON.stringify({
          font: settings.font,
          color: settings.color,
          times: settings.times,
        });
        await AsyncStorage.setItem(PREFERENCES_KEY, dataToSave);
      } catch (e) {
        console.error("Failed to save preferences", e);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      activeFont,
      activeColor,
      activeMode,
      times,
      handleModeChange,
      updateAllSettings,
      loaded,
    }),
    [
      activeFont,
      activeColor,
      activeMode,
      times,
      handleModeChange,
      updateAllSettings,
      loaded,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
