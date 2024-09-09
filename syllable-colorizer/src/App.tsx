// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import colorMapping from './colorMapping';
import './App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [coloredText, setColoredText] = useState<JSX.Element[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/map_syllables_to_colors', {
        text,
        lang: 'en_US',
        N: 4,
      });
      const data = response.data;
      const coloredElements = data.map((item: [string, number], index: number) => (
        <span key={index} style={{ color: colorMapping[item[1]] }}>
          {item[0]}
        </span>
      ));
      setColoredText(coloredElements);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Syllable Colorizer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="colored-text">{coloredText}</div>
    </div>
  );
};

export default App;