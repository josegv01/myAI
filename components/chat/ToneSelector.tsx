"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState("Default");

  useEffect(() => {
    setSelectedTone(getAITone()); // ✅ Keep UI in sync with stored tone
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(toneKey);
    setAITone(toneKey);

    // ✅ Trigger a UI update for the chat system
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  return (
    <div className="flex justify-center items-center">
      <Button className="gap-2 shadow-sm" variant="outline" size="sm">
        <MenuIcon className="w-4 h-4" />
        <select
          value={selectedTone}
          onChange={handleToneChange}
          className="bg-transparent border-none outline-none cursor-pointer"
        >
          {Object.keys(AI_TONES).map((tone) => (
            <option key={tone} value={tone} className="text-black">
              {tone.replace("_", " ")}
            </option>
          ))}
        </select>
      </Button>
    </div>
  );
}
