// src/Syllable.tsx
import React, { useEffect } from 'react';
import colorMapping from '../utils/colorMapping';
import config from '../config'; // Import the configuration
import './Syllable.css'; // Ensure this path is correct

interface SyllableProps {
    text: string;
    colorIndex: number;
    isPlaying: boolean;
    emojiStatus: 'happy' | 'sad'; // Add new prop for emoji status
}

const Syllable: React.FC<SyllableProps> = ({ text, colorIndex, isPlaying, emojiStatus }) => {
    useEffect(() => {
        // Set CSS variables based on config
        document.documentElement.style.setProperty('--dot-color', config.dotColor);
        document.documentElement.style.setProperty('--dot-animation', config.dotAnimation ? 'pulse 1s infinite' : 'none');
    }, []);

    return (
        <span style={{ position: 'relative', color: colorMapping[colorIndex] }}>
            {config.showDot && isPlaying && text.trim() !== '' && (
                <span className="emoji-indicator">{emojiStatus === 'happy' ? '😊' : '😢'}</span> // Use emoji based on status
            )}
            {text}
        </span>
    );
};

export default Syllable;