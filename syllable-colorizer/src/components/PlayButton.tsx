// src/components/PlayButton.tsx
import React from 'react';
import appConfig from '../config';
import playNotes from '../utils/playNotes';

interface PlayButtonProps {
  className: string;
  syllableData: [string, number][];
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioContext: AudioContext | null;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  className,
  syllableData,
  setCurrentSyllableIndex,
  isPlaying,
  setIsPlaying,
  audioContext
}) => {
  const handleButtonClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentSyllableIndex(0);
    } else {
      playNotes(syllableData, setCurrentSyllableIndex, setIsPlaying, audioContext);
    }
  };

  return (
    <button
      className={className}
      onClick={handleButtonClick}
      style={{
        cursor: 'pointer'
      }}
    >
      {isPlaying ? 'Reset' : appConfig.playButtonText}
    </button>
  );
};

export default PlayButton;