"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui"; // ✅ Import from config

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState(TONE_BUTTON_TEXT); // ✅ Default text

  useEffect(() => {
    const currentTone = getAITone();
    if (currentTone !== "Default") {
      setSelectedTone(TONE_BUTTON_TEXT); // ✅ Keep "Select Capy's Mood" when closed
    }
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(TONE_BUTTON_TEXT); // ✅ Keep button text consistent
    setAITone(toneKey);

    // ✅ Trigger a UI update for the chat system
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  return (
    <div className="relative">
      {/* Button Styled Like Capy Videos Button */}
      <Button className="gap-2 shadow-sm w-[170px] flex justify-between items-center" variant="outline" size="sm">
        <SlidersHorizontal className="w-4 h-4" />
        
        {/* Styled Select Menu inside the button */}
        <select
          value={selectedTone}
          onChange={handleToneChange}
          className="bg-transparent border-none outline-none cursor-pointer w-full"
        >
          <option disabled>{TONE_BUTTON_TEXT}</option> {/* ✅ Uses config text */}
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
