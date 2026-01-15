import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ICON_COLOR, CHECK_COLOR } from "./colors";

export const Icons = {
  // Arrow Up for number inputs
  ArrowUp: ({ size = 12, color = ICON_COLOR, opacity = 0.5 }) => (
    <Ionicons name="chevron-up" size={size} color={color} style={{ opacity }} />
  ),

  // Arrow Down for number inputs
  ArrowDown: ({ size = 12, color = ICON_COLOR, opacity = 0.5 }) => (
    <Ionicons
      name="chevron-down"
      size={size}
      color={color}
      style={{ opacity }}
    />
  ),

  // Close icon for the modal header
  Close: ({ size = 14, color = ICON_COLOR }) => (
    <Ionicons name="close" size={size} color={color} />
  ),

  // Check/Tick for color selection
  Check: ({ size = 12, color = CHECK_COLOR }) => (
    <MaterialCommunityIcons name="check" size={size} color={color} />
  ),

  // Settings Gear for the main screen
  Settings: ({ size = 28, color = "#D7E0FF" }) => (
    <Ionicons name="settings-sharp" size={size} color={color} />
  ),
};
