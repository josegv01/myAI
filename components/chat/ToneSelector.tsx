"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ✅ Missing import added
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState("Default");

  useEffect(() => {
    // Sync with stored tone when component loads
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

  // Display "Select Capy's mood" until a tone is picked
  const displayedTone =
    selectedTone === "Default" ? TONE_BUTTON_TEXT : selectedTone;

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
        value={selectedTone
