import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "@/context/app-context";
import { useAudioPlayer } from "expo-audio";

const audioSource = require("@/assets/sounds/alarm.mp3");

export const useTimer = () => {
  const { activeMode, handleModeChange, times } = useAppContext();
  const player = useAudioPlayer(audioSource);

  const getInitialSeconds = useCallback(() => {
    return times[activeMode] * 60;
  }, [activeMode, times]);

  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds());
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    setSecondsLeft(getInitialSeconds());
    setIsActive(false);
  }, [getInitialSeconds]);

  const handleSessionComplete = useCallback(() => {
    if (player) {
      player.seekTo(0);
      player.play();
    }
    if (activeMode === "pomodoro") {
      const nextCount = completedSessions + 1;
      setCompletedSessions(nextCount);

      if (nextCount % 4 === 0) {
        handleModeChange("long break");
      } else {
        handleModeChange("short break");
      }
    } else {
      handleModeChange("pomodoro");
    }
  }, [activeMode, completedSessions, handleModeChange, player]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      handleSessionComplete();
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, secondsLeft, handleSessionComplete]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(getInitialSeconds());
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const totalSeconds = times[activeMode] * 60;
  const progress = secondsLeft / totalSeconds;

  return {
    secondsLeft,
    isActive,
    progress,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};
