"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState(TONE_BUTTON_TEXT); // Default text

  useEffect(() => {
    const currentTone = getAITone();
    // If there's a stored tone, but not "Default," keep the button text as the default prompt
    if (currentTone !== "Default") {
      setSelectedTone(TONE_BUTTON_TEXT);
    }
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setAITone(toneKey);
    setSelectedTone(TONE_BUTTON_TEXT); // Keep the display text consistent
    window.dispatchEvent(new Event("capyToneChanged")); // Let the chat know tone changed
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 shadow-sm w-[170px] flex justify-between items-center"
    >
      <SlidersHorizontal className="w-4 h-4" />
      {/* The select is integrated into the same button styling */}
      <select
        value={selectedTone}
        onChange={handleToneChange}
        className="bg-transparent border-none outline-none cursor-pointer w-full truncate"
      >
        <option disabled>{TONE_BUTTON_TEXT}</option>
        {Object.keys(AI_TONES).map((tone) => (
          <option key={tone} value={tone} className="text-black">
            {tone.replace("_", " ")}
          </option>
        ))}
      </select>
    </Button>
  );
}
