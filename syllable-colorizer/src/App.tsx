// src/App.tsx
import React, { useState, useEffect } from 'react'; // Removed useRef
import Form from './components/Form';
import SyllableList from './components/SyllableList';
import PlayButton from './components/PlayButton';
import NoteButtons from './components/NoteButtons';
import useSyllableData from './hooks/useSyllableData';
import appConfig from './config';
import './App.css';

const App: React.FC = () => {
  const {
    text,
    setText,
    syllableData,
    currentSyllableIndex,
    setCurrentSyllableIndex,
    isPlaying,
    setIsPlaying,
    fetchSyllableData,
  } = useSyllableData();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchSyllableData();
  };

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>{appConfig.appTitle}</h1>
      <Form text={text} setText={setText} handleSubmit={handleSubmit} />
      <SyllableList syllableData={syllableData} currentSyllableIndex={currentSyllableIndex} isPlaying={isPlaying} />
      {audioContext && <NoteButtons audioContext={audioContext} startTime={0} noteDuration={60 / appConfig.defaultTempo} />}
      <PlayButton
        className={appConfig.playButtonClassName}
        syllableData={syllableData}
        setCurrentSyllableIndex={setCurrentSyllableIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioContext={audioContext}
      />
    </div>
  );
};

export default App;