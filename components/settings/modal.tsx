import React from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { Icons } from "@/constants/icons";
import { colorMapHex, boldFontMap } from "@/constants/maps";
import { NumberInput } from "./number-input";
import { useSettings } from "@/hooks/use-settings";

export const ModalContent = ({
  closeSettingsModal,
}: {
  closeSettingsModal: () => void;
}) => {
  const {
    localTimes,
    localFont,
    localColor,
    setLocalFont,
    setLocalColor,
    updateLocalTime,
    applySettings,
    fonts,
    colors,
  } = useSettings(closeSettingsModal);

  return (
    <View className="relative w-full bg-white rounded-[25px] max-w-[540px] pb-10 overflow-visible">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-6 md:px-10 md:py-8 border-b border-gray-100">
        <Text
          className={`text-secondary-navy-200  text-2xl ${boldFontMap[localFont]}`}
        >
          Settings
        </Text>
        <Pressable onPress={closeSettingsModal} hitSlop={20}>
          <Icons.Close />
        </Pressable>
      </View>

      <ScrollView
        className="px-6 md:px-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Time Section */}
        <View className="py-6 border-b border-gray-100">
          <Text
            className={`text-secondary-navy-200 text-[11px]  tracking-[4px] uppercase mb-6  md:text-left ${boldFontMap[localFont]}`}
          >
            Time (minutes)
          </Text>

          <View className="flex-col md:flex-row justify-between">
            <NumberInput
              label="pomodoro"
              value={localTimes.pomodoro}
              onChange={(v) => updateLocalTime("pomodoro", v)}
            />
            <NumberInput
              label="short break"
              value={localTimes["short break"]}
              onChange={(v) => updateLocalTime("short break", v)}
            />
            <NumberInput
              label="long break"
              value={localTimes["long break"]}
              onChange={(v) => updateLocalTime("long break", v)}
            />
          </View>
        </View>

        {/* Font Section */}
        <View className="py-6 border-b border-gray-100 flex-row justify-between items-center">
          <Text
            className={`text-secondary-navy-200 text-[11px]  tracking-[4px] uppercase ${boldFontMap[localFont]}`}
          >
            Font
          </Text>
          <View className="flex-row gap-4">
            {fonts.map((font) => (
              <Pressable
                key={font}
                onPress={() => setLocalFont(font)}
                className={`w-10 h-10 rounded-full flex justify-center items-center  ${
                  localFont === font
                    ? "bg-secondary-navy-200"
                    : "bg-secondary-light-grey"
                }`}
              >
                <Text
                  className={`text-sm ${boldFontMap[font]}  ${
                    localFont === font
                      ? "text-white"
                      : "text-secondary-navy-200"
                  }`}
                >
                  Aa
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Color Section */}
        <View className="py-6 flex-row justify-between items-center mb-4">
          <Text
            className={`text-secondary-navy-200 text-[11px] tracking-[4px] uppercase ${boldFontMap[localFont]}`}
          >
            Color
          </Text>
          <View className="flex-row gap-4">
            {colors.map((color) => (
              <Pressable
                key={color}
                onPress={() => setLocalColor(color)}
                style={{ backgroundColor: colorMapHex[color] }}
                className="w-10 h-10 rounded-full flex justify-center items-center"
              >
                {localColor === color && (
                  <Icons.Check size={16} color="#1E213F" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Apply Button */}
      <View
        className="absolute -bottom-7 left-0 right-0 items-center"
        style={{ zIndex: 50 }}
      >
        <Pressable
          onPress={applySettings}
          style={{
            backgroundColor: colorMapHex[localColor],
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
              },
              android: { elevation: 8 },
            }),
          }}
          className="w-[140px] h-[53px] rounded-full justify-center items-center"
        >
          <Text className={`text-white  text-base ${boldFontMap[localFont]}`}>
            Apply
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
