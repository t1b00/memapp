import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import SyllableList from './components/SyllableList';
import PlayButton from './components/PlayButton';
import appConfig from './config';
import './App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [syllableData, setSyllableData] = useState<[string, number][]>([]);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // New state for play button

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(appConfig.apiEndpoint, {
        text,
        lang: appConfig.language,
        N: appConfig.syllableCount,
      });
      const data = response.data;
      setSyllableData(data);
      setCurrentSyllableIndex(null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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