import { motion } from "framer-motion";
import cx from "classnames";

import { useAppStore } from "@/store/appStore";
import { Answer, Question } from "@/types";

import "./index.css";

type QuestionCardProps = {
  question: Question;
  index: number;
};

const getAnimationProps = (index: number) => ({
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: 5,
    transition: {
      duration: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
      delay: index === 0 ? 0 : 1 - index * 0.15,
    },
  },
  transition: {
    duration: 1,
    ease: [0, 0.71, 0.2, 1.01],
  },
});

export const QuestionCard = ({ question, index }: QuestionCardProps) => {
  const userAnswers = useAppStore((state) => state.userAnswers);

  const addQuestion = useAppStore((state) => state.addQuestion);
  const sliceQuestions = useAppStore((state) => state.sliceQuestions);

  const addAnswer = useAppStore((state) => state.addAnswer);
  const sliceAnswers = useAppStore((state) => state.sliceAnswers);

  const handleAnswer = (answer: Answer, question: Question) => {
    // update user answers
    addAnswer(answer.id, question.id);

    // update result if user reaches the result
    if (answer.component) {
      return;
    }

    // update questions array if selected answer has question and reset result
    if (answer.question) {
      addQuestion(answer.question);
      return;
    }
  };

  const resetHere = (question: Question) => {
    sliceAnswers(question);
    sliceQuestions(question);
  };

  const isAnswered = (questionId: number) => {
    // check given question is answered or not
    return !!userAnswers.find(
      (userAnswer) => userAnswer.questionId === questionId
    );
  };

  const isSelectedAnswer = (questionAnswerId: number) => {
    return !!userAnswers.find(
      (userAnswer) => userAnswer.answerId === questionAnswerId
    );
  };

  return (
    <motion.div {...getAnimationProps(index)}>
      <div className="card-container">
        <span className="icon">
          <span className="order">{index + 1}.</span>
        </span>
        <h4>{question.label}</h4>
        <div className="shine"></div>
        <div className="background">
          <div className="tiles">
            <div className="tile tile-1"></div>
            <div className="tile tile-2"></div>
            <div className="tile tile-3"></div>
            <div className="tile tile-4"></div>

            <div className="tile tile-5"></div>
            <div className="tile tile-6"></div>
            <div className="tile tile-7"></div>
            <div className="tile tile-8"></div>

            <div className="tile tile-9"></div>
            <div className="tile tile-10"></div>
          </div>

          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>

        <div className="answers">
          {question.answers.map((questionAnswer) => (
            <button
              className={cx({
                answer: true,
                success: questionAnswer.level === "success",
                danger: questionAnswer.level === "danger",
                natural: questionAnswer.level === "natural",
                selected: isSelectedAnswer(questionAnswer.id),
              })}
              disabled={isAnswered(question.id)}
              onClick={() => handleAnswer(questionAnswer, question)}
              // style={{
              //   backgroundColor: isSelectedAnswer(questionAnswer.id)
              //     ? "red"
              //     : "blue",
              // }}
            >
              {questionAnswer.label}
            </button>
          ))}
          {isAnswered(question.id) && (
            <div className="refresh" onClick={() => resetHere(question)}>
              <svg
                fill="#fff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 489.645 489.645"
              >
                <g>
                  <path
                    d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"
                  />
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
      {/* <div className="card-container">
        <h3>{question.label}</h3> */}

      {/* </div> */}
    </motion.div>
  );
};
