"use client";

import { useState, useEffect } from "react";
import { setAITone, AI_TONES, getAITone } from "@/configuration/identity";

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState("Default");

  useEffect(() => {
    setSelectedTone(getAITone()); // ✅ Update the dropdown if the tone changes elsewhere
  }, []);

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(toneKey);
    setAITone(toneKey);

    // ✅ Force the chat to recognize the new tone
    window.dispatchEvent(new Event("capyToneChanged"));
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-semibold">Capy’s Mood:</label>
      <select
        value={selectedTone}
        onChange={handleToneChange}
        className="border rounded-md px-2 py-1"
      >
        {Object.keys(AI_TONES).map((tone) => (
          <option key={tone} value={tone}>
            {tone.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
