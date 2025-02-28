"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState("Default");

  useEffect(() => {
    // Sync local state with the stored tone on mount
    const currentTone = getAITone();
    if (currentTone) {
      setSelectedTone(currentTone);
    }
  }, []);

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = e.target.value as keyof typeof AI_TONES;
    setAITone(toneKey);      // Update the global tone
    setSelectedTone(toneKey); // Update local state
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  // If user hasn't selected anything or is "Default," show TONE_BUTTON_TEXT
  // Otherwise show the actual tone (e.g., "Formal", "Sassy")
  const displayedTone =
    selectedTone === "Default" ? TONE_BUTTON_TEXT : selectedTone;

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 shadow-sm w-[180px] relative"
    >
      {/* Icon */}
      <SlidersHorizontal className="w-4 h-4" />

      {/* 
        1) Absolutely-positioned label that shows the selected tone 
        2) Ensures no overlap with the select 
      */}
      <span className="absolute left-[2.2rem] text-ellipsis overflow-hidden whitespace-nowrap max-w-[7rem]">
        {displayedTone}
      </span>

      {/*
        The <select> is transparent in the button,
        so we hide its text on the button but still show it in the dropdown.
        textShadow trick ensures text is visible in the dropdown, but invisible in the button.
      */}
      <select
        value={selectedTone}
        onChange={handleToneChange}
        className="bg-transparent text-transparent border-none outline-none cursor-pointer w-full"
        style={{ textShadow: "0 0 0 #000" }} 
      >
        <option value="Default" disabled>
          {TONE_BUTTON_TEXT}
        </option>
        {Object.keys(AI_TONES).map((tone) => (
          <option key={tone} value={tone}>
            {tone.replace("_", " ")}
          </option>
        ))}
      </select>
    </Button>
  );
}
