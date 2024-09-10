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
}

const appConfig: Config = config;

export default appConfig;