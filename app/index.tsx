import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import { useAppContext } from "@/context/app-context";
import ModeSwitcher from "@/components/mode-switcher";
import { Icons } from "@/constants/icons";
import Timer from "@/components/timer";
import { SettingsModal } from "@/components/settings/settings-modal";

export default function TimerScreen() {
  const { activeFont, loaded } = useAppContext();

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // Prevent flicker before settings are loaded from AsyncStorage
  if (!loaded) return null;

  const boldFontMap = {
    kumbh: "font-kumbh-bold",
    roboto: "font-roboto-bold",
    mono: "font-mono-bold",
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1  items-center pt-4 px-6">
        <Text
          className={`text-white text-3xl mb-10 text-center ${boldFontMap[activeFont ?? "kumbh"]}`}
        >
          pomodoro
        </Text>

        <ModeSwitcher />

        <Timer />

        {/* Settings Gear - Link to modal.tsx */}
        <Pressable
          onPress={() => setIsSettingsVisible(true)}
          className="active:opacity-60 p-4 mt-auto mb-12"
          hitSlop={20}
        >
          <Icons.Settings />
        </Pressable>
      </View>

      <SettingsModal
        isVisible={isSettingsVisible}
        closeSettingsModal={() => setIsSettingsVisible(false)}
      />
    </SafeAreaView>
  );
}
