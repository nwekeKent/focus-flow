import React from "react";
import { View, Text, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useAppContext } from "@/context/app-context";
import { useTimer } from "@/hooks/use-timer";
import { colorMapHex, boldFontMap } from "@/constants/maps";

export default function Timer() {
  const { activeColor, activeFont } = useAppContext();
  const { progress, isActive, toggleTimer, formatTime } = useTimer();

  // SVG Constants
  const size = 260;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View className="w-full mt-20 mb-12 max-w-[300px] h-[300px] md:w-[410px] md:h-[410px] md:max-w-[410px] rounded-[410px] items-center justify-center relative">
      <View className="w-full h-full bg-secondary-navy-200 rounded-[100%] flex flex-col justify-center items-center relative">
        <Svg
          width={size}
          height={size}
          style={{ transform: [{ rotate: "90deg" }, { scaleX: -1 }] }}
        >
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colorMapHex[activeColor || "red"]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </Svg>

        <View className="absolute  items-center justify-center">
          <Text
            className={`text-white tracking-[-3px] text-[70px]  ${boldFontMap[activeFont || "kumbh"]}`}
          >
            {formatTime()}
          </Text>

          <Pressable onPress={toggleTimer} className="active:opacity-70">
            <Text
              className={`text-white text-xl tracking-[12px]  opacity-80 ${boldFontMap[activeFont || "kumbh"]}`}
            >
              {isActive ? "PAUSE" : "START"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
