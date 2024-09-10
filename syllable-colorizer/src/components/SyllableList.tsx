import React from 'react';
import Syllable from './Syllable';

interface SyllableListProps {
  syllableData: [string, number][];
  currentSyllableIndex: number | null;
}

const SyllableList: React.FC<SyllableListProps> = ({ syllableData, currentSyllableIndex }) => (
  <div className="colored-text">
    {syllableData.map(([syllable, colorIndex], index) => (
      <Syllable
        key={index}
        text={syllable}
        colorIndex={colorIndex}
        isPlaying={index === currentSyllableIndex}
      />
    ))}
  </div>
);

export default SyllableList;