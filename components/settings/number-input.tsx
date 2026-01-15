import { View, Text, TextInput, Pressable } from "react-native";
import { Icons } from "@/constants/icons"; // Using the Icon registry we made

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export function NumberInput({
  value,
  onChange,
  label,
  min = 1,
  max = 60,
}: NumberInputProps) {
  const handleIncrement = () => {
    if (value >= max) return;
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const handleInputChange = (text: string) => {
    if (text === "") {
      onChange(0); // We'll fix this onBlur
      return;
    }

    // 2. Remove non-numeric chars and parse
    const newValue = parseInt(text.replace(/[^0-9]/g, ""));

    // 3. Validate number
    if (isNaN(newValue)) return;

    // 4. Max check (Min check usually happens on Blur so they can delete '1' to type '2')
    if (newValue > max) {
      onChange(max);
      return;
    }

    onChange(newValue);
  };

  // Logic: handleBlur (Ensures the value is valid when they stop typing)
  const handleBlur = () => {
    if (value < min) {
      onChange(min);
    }
  };

  return (
    <View className="flex-row md:flex-col justify-between items-center w-full md:w-[140px] mb-4">
      <Text className="text-secondary-navy-100/40 text-[10px] font-bold  ">
        {label}
      </Text>

      <View className="w-[140px] h-12 bg-secondary-light-grey rounded-xl flex-row items-center px-4 overflow-hidden">
        <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
          <TextInput
            keyboardType="number-pad"
            value={value === 0 ? "" : String(value)}
            onChangeText={handleInputChange}
            onBlur={handleBlur}
            style={{
              // fontFamily: fontMap[localFont],
              fontSize: 14,
              fontWeight: "700",
              paddingVertical: 0,
              height: 22,
              textAlignVertical: "center",
            }}
            className="flex-1 text-secondary-navy-100"
          />
        </View>

        {/* 3. Center the icon column vertically */}
        <View className="flex-col justify-center items-center h-full">
          <Pressable onPress={handleIncrement} className="py-1" hitSlop={10}>
            <Icons.ArrowUp opacity={value >= max ? 0.25 : 0.5} />
          </Pressable>
          <Pressable onPress={handleDecrement} className="py-1" hitSlop={10}>
            <Icons.ArrowDown opacity={value <= min ? 0.25 : 0.5} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
