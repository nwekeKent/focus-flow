import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ICON_COLOR, CHECK_COLOR } from "./colors";

export const Icons = {
  ArrowUp: ({ size = 12, color = ICON_COLOR, opacity = 0.5 }) => (
    <Ionicons name="chevron-up" size={size} color={color} style={{ opacity }} />
  ),

  ArrowDown: ({ size = 12, color = ICON_COLOR, opacity = 0.5 }) => (
    <Ionicons
      name="chevron-down"
      size={size}
      color={color}
      style={{ opacity }}
    />
  ),

  Close: ({ size = 14, color = ICON_COLOR }) => (
    <Ionicons name="close" size={size} color={color} />
  ),

  Check: ({ size = 12, color = CHECK_COLOR }) => (
    <MaterialCommunityIcons name="check" size={size} color={color} />
  ),

  Settings: ({ size = 28, color = "#D7E0FF" }) => (
    <Ionicons name="settings-sharp" size={size} color={color} />
  ),
};
