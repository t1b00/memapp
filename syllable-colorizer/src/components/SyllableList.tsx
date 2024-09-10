import React from 'react';
import Syllable from './Syllable';

interface SyllableListProps {
  syllableData: [string, number][];
  currentSyllableIndex: number | null;
}

// Helper function to find the closest valid color index
const findClosestColorIndex = (syllableData: [string, number][], index: number): number => {
  let left = index - 1;
  let right = index + 1;

  while (left >= 0 || right < syllableData.length) {
    if (left >= 0 && syllableData[left][1] !== -1) {
      return syllableData[left][1];
    }
    if (right < syllableData.length && syllableData[right][1] !== -1) {
      return syllableData[right][1];
    }
    left--;
    right++;
  }

  // Default color index if no valid color is found (this case should ideally not happen)
  return 0;
};

const SyllableList: React.FC<SyllableListProps> = ({ syllableData, currentSyllableIndex }) => (
  <div className="colored-text">
    {syllableData.map(([syllable, colorIndex], index) => {
      const finalColorIndex = colorIndex === -1 ? findClosestColorIndex(syllableData, index) : colorIndex;
      return (
        <Syllable
          key={index}
          text={syllable}
          colorIndex={finalColorIndex}
          isPlaying={index === currentSyllableIndex}
        />
      );
    })}
  </div>
);

export default SyllableList;