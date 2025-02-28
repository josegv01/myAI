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
