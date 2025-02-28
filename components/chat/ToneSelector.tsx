"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState<keyof typeof AI_TONES>("Default");

  useEffect(() => {
    // ✅ Ensure `currentTone` is typed correctly
    const currentTone = getAITone() as keyof typeof AI_TONES;
    
    // ✅ Fix: Ensure the tone exists before setting it
    if (currentTone in AI_TONES) {
      setSelectedTone(currentTone);
    }
  }, []);

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = e.target.value as keyof typeof AI_TONES;
    setAITone(toneKey);
    setSelectedTone(toneKey);
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  // ✅ Fix: Ensure only the tone name is displayed
  const displayedTone = selectedTone === "Default" ? TONE_BUTTON_TEXT : selectedTone;

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 shadow-sm w-[180px] flex justify-between items-center relative"
    >
      {/* Icon */}
      <SlidersHorizontal className="w-4 h-4" />

      {/* Selected Tone Display */}
      <span className="absolute left-[2.2rem] text-ellipsis overflow-hidden whitespace-nowrap max-w-[7rem]">
        {displayedTone}
      </span>

      {/* Select Dropdown (Hidden Text) */}
      <select
        value={selectedTone}
        onChange={handleToneChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        <option value="Default" disabled>
          {TONE_BUTTON_TEXT}
        </option>
        {Object.keys(AI_TONES).map((tone) => (
          <option key={tone} value={tone}>
            {tone}
          </option>
        ))}
      </select>
    </Button>
  );
}
