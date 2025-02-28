"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState("Default");

  // On mount, sync with any previously chosen tone
  useEffect(() => {
    const currentTone = getAITone();
    if (currentTone) {
      setSelectedTone(currentTone);
    }
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    // Store the new tone globally & locally
    setAITone(toneKey);
    setSelectedTone(toneKey);
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  // If user hasn't selected anything yet, show "Select Capy's mood"
  // Otherwise show the chosen tone
  const buttonLabel =
    selectedTone === "Default" ? TONE_BUTTON_TEXT : selectedTone;

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
        {/* Disabled default option */}
        <option value="Default" disabled>
          {TONE_BUTTON_TEXT}
        </option>

        {/* Map out the tones */}
        {Object.keys(AI_TONES).map((tone) => (
          <option key={tone} value={tone} className="text-black">
            {tone.replace("_", " ")}
          </option>
        ))}
      </select>

      {/* The label that shows the chosen tone (or default prompt) */}
      <span className="absolute ml-[2.6rem] truncate max-w-[100px] text-left">
        {buttonLabel}
      </span>
    </Button>
  );
}
