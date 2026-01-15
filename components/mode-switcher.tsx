import { View, Text, Pressable } from "react-native";
import { useAppContext } from "@/context/app-context";
import { boldFontMap, colorMap, modes } from "@/constants/maps";

export default function ModeSwitcher() {
  const { activeMode, handleModeChange, activeColor, activeFont } =
    useAppContext();

  return (
    <View className="flex-row h-16 bg-secondary-navy-200 mt-[45px] md:mt-[58px] p-2 rounded-full w-full max-w-[330px] justify-between self-center">
      {modes.map((mode) => {
        const isActive = activeMode === mode;

        return (
          <Pressable
            key={mode}
            onPress={() => handleModeChange(mode)}
            className={`px-6  h-full py-4 rounded-full ${
              isActive ? colorMap[activeColor ?? "red"] : "bg-transparent"
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-bold ${boldFontMap[activeFont || "kumbh"]} ${
                isActive
                  ? "text-secondary-navy-100"
                  : "text-secondary-grey opacity-40"
              }`}
            >
              {mode}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
