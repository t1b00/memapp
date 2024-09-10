// src/hooks/useSyllableData.ts
import { useState } from 'react';
import axios from 'axios';
import appConfig from '../config';

const useSyllableData = () => {
  const [text, setText] = useState('');
  const [syllableData, setSyllableData] = useState<[string, number][]>([]);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchSyllableData = async () => {
    try {
      const response = await axios.post(appConfig.apiEndpoint, {
        text,
        lang: appConfig.language,
        N: appConfig.syllableCount,
      });
      const data = response.data;
      setSyllableData(data);
      setCurrentSyllableIndex(0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return {
    text,
    setText,
    syllableData,
    currentSyllableIndex,
    setCurrentSyllableIndex,
    isPlaying,
    setIsPlaying,
    fetchSyllableData,
  };
};

export default useSyllableData;