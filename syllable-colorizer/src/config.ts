// src/config.ts
import config from './config.json';

interface Config {
  apiEndpoint: string;
  language: string;
  syllableCount: number;
  defaultTempo: number;
  appTitle: string;
  inputPlaceholder: string;
  submitButtonText: string;
  playButtonText: string;
  colors: string[];
  playButtonClassName: string;
  showDot: boolean;
  dotColor: string;
  dotAnimation: boolean;
  learnTuneButtonClassName: string;
  learnTuneButtonText: string;
}

const appConfig: Config = config;

export default appConfig;