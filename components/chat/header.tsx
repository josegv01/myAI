"use client";

import { Button } from "@/components/ui/button";
import { EraserIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT, CAPY_VIDEOS_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import { useEffect, useRef, useState } from "react";

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
  
  // Left Button: Opens YouTube with "capybaras" search
  const handleLeftButtonClick = () => {
    window.open("https://www.youtube.com/results?search_query=capybaras", "_blank");
  };

  // Music Player Logic (Single Instance)
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to autoplay and handle browser restrictions
    audioRef.current
      .play()
      .catch((error) => console.log("Autoplay blocked, waiting for user interaction:", error));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => console.log("Playback error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="z-10 flex justify-center items-center fixed top-0 w-full p-5 bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      <div className="flex w-full">
        
        {/* Left Button (YouTube Search) */}
        <div className="flex-0 w-[100px] flex justify-start items-center">
          <Button
            onClick={handleLeftButtonClick}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <MenuIcon className="w-4 h-4" />
            <span>{CAPY_VIDEOS_BUTTON_TEXT}</span>
          </Button>
        </div>

        {/* Header Title */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>

        {/* Right Buttons (Music Toggle + Clear Chat) */}
        <div className="flex-0 w-[160px] flex justify-end items-center gap-2">
          {/* Music Toggle Button */}
          <Button
            onClick={toggleMusic}
            className="w-auto px-4 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            {isPlaying ? "MUSIC OFF" : "MUSIC ON"}
          </Button>

          {/* Clear Chat Button */}
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
