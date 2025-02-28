"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui"; // ✅ Import from config

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState(TONE_BUTTON_TEXT); // ✅ Use text from config
  const [isOpen, setIsOpen] = useState(false); // ✅ Dropdown visibility state

  useEffect(() => {
    const currentTone = getAITone();
    if (currentTone !== "Default") {
      setSelectedTone(currentTone);
    }
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(toneKey);
    setAITone(toneKey);
    setIsOpen(false); // ✅ Close dropdown after selection

    // ✅ Trigger a UI update for the chat system
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  return (
    <div className="relative">
      {/* Button Styled Like Capy Videos Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 shadow-sm w-[170px] flex justify-between items-center"
        variant="outline"
        size="sm"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="truncate max-w-[110px] text-left">{selectedTone}</span> {/* ✅ Prevents text overflow */}
      </Button>

      {/* Dropdown appears only when button is clicked */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-[200px] bg-white border rounded-md shadow-lg z-50">
          <select
            onChange={handleToneChange}
            className="w-full p-2 bg-white border-none outline-none cursor-pointer"
          >
            <option disabled>{TONE_BUTTON_TEXT}</option> {/* ✅ Uses config text */}
            {Object.keys(AI_TONES).map((tone) => (
              <option key={tone} value={tone} className="text-black truncate">
                {tone.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
