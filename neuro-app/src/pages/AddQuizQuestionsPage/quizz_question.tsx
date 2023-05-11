import React, { useState, useEffect } from 'react';
import styles from './Body.module.css';
import Header from './header';
import { useNavigate } from 'react-router-dom';

interface Answer {
  idQuestion: number;
  answerText: string;
  correct: boolean;
}

interface Question {
  id: number;
  questionText: string;
  difficulty: number;
  timeMinutes: number;
  lectureNumber: number;
  idCourse: number;
  idProfessor: number;
  answersQuestion: Answer[];
}

const Quizz_question: React.FC<{}> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (successMessageVisible) {
      const redirectTimeout = setTimeout(() => {
        setSuccessMessageVisible(false);
        navigate('/AllQuestions'); // Efectuăm redirecționarea către '/AllQuestions'
      }, 3000);

      return () => {
        clearTimeout(redirectTimeout);
      };
    }
  }, [successMessageVisible, navigate]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      questionText: '',
      difficulty: 0,
      timeMinutes: 0,
      lectureNumber: 2,
      idCourse: 4,
      idProfessor: 57,
      answersQuestion: [],
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    const newAnswer: Answer = {
      idQuestion: newQuestions[questionIndex].id,
      answerText: '',
      correct: false,
    };
    newQuestions[questionIndex].answersQuestion.push(newAnswer);
    setQuestions(newQuestions);
  };

  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].questionText = event.target.value;
      return newQuestions;
    });
  };

  const handleAnswerTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion[answerIndex].answerText = event.target.value;
      return newQuestions;
    });
  };

  const handleAnswerCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion[answerIndex].correct = event.target.checked;
      return newQuestions;
    });
  };

 
  const removeQuestion = (questionIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(questionIndex, 1);
      return newQuestions;
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].answersQuestion.splice(answerIndex, 1);
      return newQuestions;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessageVisible(true);

    // Verificăm dacă există întrebări completate
    const completedQuestions = questions.filter(
      (question) => question.questionText.trim() !== '' && question.answersQuestion.length > 0
    );

    if (completedQuestions.length === 0) {
      // Afisăm un mesaj de eroare sau luăm măsuri corespunzătoare
      console.error('Trebuie completate cel puțin o întrebare cu răspunsuri');
      return;
    }

    try {
      const promises = questions.map(async (question) => {
        const response = await fetch('http://localhost:8192/questionQuizz/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        });

        if (!response.ok) {
          throw new Error('Răspunsul serverului a fost incorect');
        }

        return response.json();
      });

      const results = await Promise.all(promises);

      setTimeout(() => {
        setSuccessMessageVisible(false);
        if (results.length > 0) {
          navigate('/AllQuestions');
        }
      }, 1000);

    } catch (error) {
      console.error(error);
    }
  };

  const setTime = (questionIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].timeMinutes = value;
    setQuestions(newQuestions);
  };

  const setDifficulty = (questionIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].difficulty = value;
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['body--second_text']}>
        Enter the question and the answer options, ticking the correct answers.<br />
        Determine the difficulty and time of the question.
      </div>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <div className={styles['box']}>
            <Header
              time={question.timeMinutes}
              difficulty={question.difficulty}
              setTime={(newTime) => setTime(questionIndex, newTime)}
              setDifficulty={(newDifficulty) => setDifficulty(questionIndex, newDifficulty)}
            />
            <label>
              <input
                type="text"
                value={question.questionText}
                placeholder="Type question here"
                className={styles.quest}
                onChange={(event) => handleQuestionTextChange(event, questionIndex)}
              />
            </label>
            <button type="button" onClick={() => removeQuestion(questionIndex)} className={styles.removeq}>
              Remove
            </button>
            <div>
              {question.answersQuestion.map((answer, answerIndex) => (
                <div key={answer.idQuestion}>
                  <label className={styles.lb}>
                    <input
                      type="checkbox"
                      checked={answer.correct}
                      className={styles.check}
                      onChange={(event) => handleAnswerCheckboxChange(event, questionIndex, answerIndex)}
                    />
                    <input
                      type="text"
                      value={answer.answerText}
                      placeholder="Answer choice"
                      className={styles.answ}
                      onChange={(event) => handleAnswerTextChange(event, questionIndex, answerIndex)}
                    />
                    <button
                      type="button"
                      onClick={() => removeAnswer(questionIndex, answerIndex)}
                      className={styles.removea}
                    >
                      Remove
                    </button>
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addAnswer(questionIndex)} className={styles.addansw}>
                + Add answer
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles['buttons--container']}>



        <button type="button" className={styles.addquest} onClick={addQuestion}>
          + Add Multiple Choice
        </button>

        <button type="submit" className={styles['button--create']}>
          Save and Exit
        </button>

      </div>

      {successMessageVisible && <div className={styles.successMessage}>
        Questions successfully saved waiting to be redirected!</div>}
    </form>
  );
};
export default Quizz_question;