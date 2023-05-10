import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/InputCode.module.css';

interface Props {
  onSaveCodeExam: (codeExam: string) => void;
}

const CodeExamInput: React.FC<Props> = ({ onSaveCodeExam }) => {
  const [codeExam, setCodeExam] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeExam(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveCodeExam(codeExam);
    setCodeExam('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" value={codeExam} onChange={handleChange} />
      </label>
      <Link to="/QuestionTextPage">
        <button type="submit">Start The Exam !</button>
      </Link>
    </form>
  );
};

export default CodeExamInput;
