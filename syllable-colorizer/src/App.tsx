import React, { useState } from 'react';
import axios from 'axios';
import Syllable from './Syllable';
import playNotes from './playNotes';
import appConfig from './config';
import './App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [syllableData, setSyllableData] = useState<[string, number][]>([]);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState<number | null>(null);

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={appConfig.inputPlaceholder}
        />
        <button type="submit">{appConfig.submitButtonText}</button>
      </form>
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
      <button onClick={() => playNotes(syllableData, setCurrentSyllableIndex)}>
        {appConfig.playButtonText}
      </button>
    </div>
  );
};

export default App;