import React from "react";
import { Modal, View, Pressable } from "react-native";
import { ModalContent } from "./modal";

interface SettingsModalProps {
  isVisible: boolean;
  closeSettingsModal: () => void;
}

export const SettingsModal = ({
  isVisible,
  closeSettingsModal,
}: SettingsModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeSettingsModal}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <Pressable className="absolute inset-0" onPress={closeSettingsModal} />
        <ModalContent closeSettingsModal={closeSettingsModal} />
      </View>
    </Modal>
  );
};
