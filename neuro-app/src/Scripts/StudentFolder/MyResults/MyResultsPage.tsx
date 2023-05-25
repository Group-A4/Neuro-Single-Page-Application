import React, { useEffect, useState } from "react";
import styles from "./Body.module.css";
import Nav from "../NavBarStudent/Nav";
import { useNavigate } from "react-router-dom";

interface ExamData {
  id: number;
  idCourse: number;
  idProfessor: number;
  code: string;
  title: string;
  date: string;
  timeExam: number;
  evaluationType: number;
  examPoints: number;
}

interface ExamScoreData {
  idExam: number;
  studentPoints: number;
}

const Body: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<ExamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examScores, setExamScores] = useState<ExamScoreData[]>([]);

const goToExamAnswers = (examId: number) => {
  navigate(`/ViewMyExamAnswers/${examId}`);
};

  const getShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns the short date format (e.g., "5/13/2024")
  };

  useEffect(() => {
    fetch("http://localhost:8192/exam/summarise/idStudent= 219", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExams(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    fetch("http://localhost:8192/exam/points/idStudent= 219", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExamScores(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={styles["body--container"]}>
        <div className={styles["column"]}>
          <div className={styles["body--title"]}>My exam scores</div>
        </div>
        <div className={styles["column"]}>
          <div className={styles["course-container--header"]}>
            <div className={styles["code--container"]}>Code</div>
            <div className={styles["date--container"]}>Date</div>
            <div className={styles["exam--container"]}>Exam Title</div>
            <div className={styles["score--container"]}>Score</div>
            <div className={styles["button--container"]}></div>
          </div>
        </div>
        <div className={styles["column"]}>
          <div className={styles["body--line"]}></div>
        </div>

        {isLoading ? (
          <div className={styles["loading"]}>Loading...</div>
        ) : exams.length === 0 ? (
          <div className={styles["no-exams"]}>No exams to show</div>
        ) : (
          exams.map((exam) => {
            const scoreData = examScores.find(
              (score) => score.idExam === exam.id
            );
            const score = scoreData ? scoreData.studentPoints : 0;

            return (
              <div className={styles["course-container"]} key={exam.id}>
                <div className={styles["code--container"]}>{exam.code}</div>
                <div className={styles["date--container"]}>
                  {getShortDate(exam.date)}
                </div>
                <div className={styles["exam--container"]}>{exam.title}</div>
                <div className={styles["score--container"]}>
                  {score}/{exam.examPoints}
                </div>
                <div className={styles["button--container"]}>
                  <button onClick={() => goToExamAnswers(exam.id)}>
                    View My Exam Answers
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

const MyResults: React.FC<{}> = () => {
  return (
    <>
      <body className={styles["Body"]}>
        <Nav />
        <Body />
      </body>
    </>
  );
};

export default MyResults;
