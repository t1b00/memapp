import React from 'react';
import appConfig from '../config';
import playNotes from '../playNotes'; // Import playNotes here

interface PlayButtonProps {
  syllableData: [string, number][];
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const PlayButton: React.FC<PlayButtonProps> = ({ syllableData, setCurrentSyllableIndex }) => (
  <button onClick={() => playNotes(syllableData, setCurrentSyllableIndex)}>
    {appConfig.playButtonText}
  </button>
);

export default PlayButton;