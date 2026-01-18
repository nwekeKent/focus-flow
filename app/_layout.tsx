import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppProvider, useAppContext } from "@/context/app-context";
import { StatusBar } from "expo-status-bar";
import { setAudioModeAsync } from "expo-audio";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import {
  KumbhSans_400Regular,
  KumbhSans_700Bold,
} from "@expo-google-fonts/kumbh-sans";
import {
  RobotoSlab_400Regular,
  RobotoSlab_700Bold,
} from "@expo-google-fonts/roboto-slab";
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
} from "@expo-google-fonts/space-mono";
import "@/styles/globals.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootLayoutContent() {
  const { loaded: storageLoaded } = useAppContext();

  const [fontsLoaded, fontError] = useFonts({
    KumbhSans: KumbhSans_400Regular,
    RobotoSlab: RobotoSlab_400Regular,
    SpaceMono: SpaceMono_400Regular,

    "KumbhSans-Bold": KumbhSans_700Bold,
    "RobotoSlab-Bold": RobotoSlab_700Bold,
    "SpaceMono-Bold": SpaceMono_700Bold,
  });

  useEffect(() => {
    (async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: false,
        });
      } catch (e) {
        console.warn("Audio mode failed:", e);
      }
    })();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if ((fontsLoaded || fontError) && storageLoaded) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn("Splash screen hide failed:", e);
        }
      }
    }

    hideSplash();
  }, [fontsLoaded, fontError, storageLoaded]);

  if ((!fontsLoaded && !fontError) || !storageLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#1E213F" },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <RootLayoutContent />
      </SafeAreaProvider>
    </AppProvider>
  );
}
