import React from 'react';
import appConfig from '../config';

interface FormProps {
  text: string;
  setText: (text: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ text, setText, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={appConfig.inputPlaceholder}
    />
    <button type="submit">{appConfig.submitButtonText}</button>
  </form>
);

export default Form;