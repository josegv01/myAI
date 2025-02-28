"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { EraserIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import {
  CHAT_HEADER,
  CLEAR_BUTTON_TEXT,
  CAPY_VIDEOS_BUTTON_TEXT,
} from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import ToneSelector from "@/components/chat/ToneSelector";

export const AILogo = () => (
  <div className="w-12 h-12 relative">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </div>
);

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle the YouTube search button
  const handleLeftButtonClick = () => {
    window.open("https://www.youtube.com/results?search_query=capybaras", "_blank");
  };

  // Setup the music player on mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/background.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle music on/off
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) =>
          console.log("Playback error:", error)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="z-10 flex justify-center items-center fixed top-0 w-full p-5 bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      <div className="flex w-full">
        
        {/* Left Section (Capy Videos + Tone Selector) */}
        <div className="flex-0 flex items-center gap-2">
          {/* Capy Videos Button */}
          <Button
            onClick={handleLeftButtonClick}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <MenuIcon className="w-4 h-4" />
            <span>{CAPY_VIDEOS_BUTTON_TEXT}</span>
          </Button>

          {/* Tone Selector */}
          <ToneSelector />
        </div>

        {/* Header Title */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p className="text-lg font-bold">{CHAT_HEADER}</p>
        </div>

        {/* Right Buttons (Music Toggle + Clear Chat) */}
        <div className="flex-0 flex justify-end items-center gap-2">
          {/* Music Toggle */}
          <Button
            onClick={toggleMusic}
            className="w-auto px-4 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            {isPlaying ? "MUSIC OFF" : "MUSIC ON"}
          </Button>

          {/* Clear Chat */}
          <Button
            onClick={clearMessages}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <EraserIcon className="w-4 h-4" />
            <span>{CLEAR_BUTTON_TEXT}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
