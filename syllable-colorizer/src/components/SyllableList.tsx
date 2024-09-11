// src/components/SyllableList.tsx
import React from 'react';
import Syllable from './Syllable';

interface SyllableListProps {
  syllableData: [string, number][];
  currentSyllableIndex: number | null;
  isPlaying: boolean;
  emojiStatus: 'happy' | 'sad';
}

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
  return 0;
};

const SyllableList: React.FC<SyllableListProps> = ({ syllableData, currentSyllableIndex, isPlaying, emojiStatus }) => (
  <div className="colored-text">
    {syllableData.map(([syllable, colorIndex], index) => {
      const finalColorIndex = colorIndex === -1 ? findClosestColorIndex(syllableData, index) : colorIndex;
      const shouldColor = isPlaying && currentSyllableIndex !== null && index < currentSyllableIndex;
      return (
        <Syllable
          key={index}
          text={syllable}
          colorIndex={shouldColor ? finalColorIndex : -1}
          isPlaying={index === currentSyllableIndex}
          emojiStatus={emojiStatus}
        />
      );
    })}
  </div>
);

export default SyllableList;