// src/Syllable.tsx
import React from 'react';
import colorMapping from '../colorMapping';

interface SyllableProps {
  text: string;
  colorIndex: number;
  isPlaying: boolean;
}

const Syllable: React.FC<SyllableProps> = ({ text, colorIndex, isPlaying }) => {
  return (
    <span style={{ position: 'relative', color: colorMapping[colorIndex] }}>
      {isPlaying && text.trim() !== '' && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
          }}
        />
      )}
      {text}
    </span>
  );
};

export default Syllable;