"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { setAITone, getAITone, AI_TONES } from "@/configuration/identity";
import { TONE_BUTTON_TEXT } from "@/configuration/ui"; // ✅ Import from config

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState(TONE_BUTTON_TEXT); // ✅ Default text
  const [isOpen, setIsOpen] = useState(false); // ✅ Dropdown visibility state

  useEffect(() => {
    const currentTone = getAITone();
    if (currentTone !== "Default") {
      setSelectedTone(TONE_BUTTON_TEXT); // ✅ Reset button text when closed
    }
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(TONE_BUTTON_TEXT); // ✅ Keep button text as default
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
        className="gap-2 shadow-sm w-[160px] flex justify-between items-center"
        variant="outline"
        size="sm"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>{TONE_BUTTON_TEXT}</span> {/* ✅ Always shows the default text */}
      </Button>

      {/* Dropdown appears below the button when clicked */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-[200px] bg-white border rounded-md shadow-lg z-50">
          <select
            onChange={handleToneChange}
            className="w-full p-2 bg-white border-none outline-none cursor-pointer"
          >
            <option disabled>{TONE_BUTTON_TEXT}</option> {/* ✅ Uses config text */}
            {Object.keys(AI_TONES).map((tone) => (
              <option key={tone} value={tone} className="text-black">
                {tone.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
