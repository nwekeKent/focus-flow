import { View, Text, TextInput, Pressable } from "react-native";
import { Icons } from "@/constants/icons";

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
      onChange(0);
      return;
    }

    const newValue = parseInt(text.replace(/[^0-9]/g, ""));

    if (isNaN(newValue)) return;

    if (newValue > max) {
      onChange(max);
      return;
    }

    onChange(newValue);
  };

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
              fontSize: 14,
              fontWeight: "700",
              paddingVertical: 0,
              height: 22,
              textAlignVertical: "center",
            }}
            className="flex-1 text-secondary-navy-100"
          />
        </View>

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
