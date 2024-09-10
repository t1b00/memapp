// src/App.tsx
import React from 'react';
import Form from './components/Form';
import SyllableList from './components/SyllableList';
import PlayButton from './components/PlayButton';
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

  return (
    <div className="App">
      <h1>{appConfig.appTitle}</h1>
      <Form text={text} setText={setText} handleSubmit={handleSubmit} />
      <SyllableList syllableData={syllableData} currentSyllableIndex={currentSyllableIndex} />
      <PlayButton
        syllableData={syllableData}
        setCurrentSyllableIndex={setCurrentSyllableIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default App;