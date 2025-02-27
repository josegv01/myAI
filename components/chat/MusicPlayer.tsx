"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false); // Start as NOT playing
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set volume level
      const enableAudio = () => {
        audio
          .play()
          .then(() => setIsPlaying(true)) // Update state to playing
          .catch((error) => console.log("Autoplay blocked:", error));
        document.removeEventListener("click", enableAudio); // Remove listener after first click
      };
      document.addEventListener("click", enableAudio); // Listen for user interaction
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Playback error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white p-3 rounded-full shadow-lg cursor-pointer">
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mp3" />
      </audio>
      <button
        onClick={toggleMusic}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>
    </div>
  );
}
