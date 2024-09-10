// src/config.ts
import config from './config.json';

interface Config {
  apiEndpoint: string;
  language: string;
  syllableCount: number;
  tempo: number;
  appTitle: string;
  inputPlaceholder: string;
  submitButtonText: string;
  playButtonText: string;
  colors: string[];
  playButtonClassName: string;
  showDot: boolean;
  dotColor: string;
  dotAnimation: boolean;
}

const appConfig: Config = config;

export default appConfig;