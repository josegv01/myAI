"use client";

import { useState } from "react";
import { setAITone, AI_TONES } from "@/configuration/identity";

export default function ToneSelector() {
  // State to track the selected tone
  const [selectedTone, setSelectedTone] = useState("DEFAULT");

  // Function to handle tone selection
  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toneKey = event.target.value as keyof typeof AI_TONES;
    setSelectedTone(toneKey);
    setAITone(toneKey);
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
