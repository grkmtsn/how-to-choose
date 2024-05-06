import * as React from "react";
import { AnimatePresence } from "framer-motion";

import { QuestionCard } from "./components/QuestionCard/QuestionCard";
import { useAppStore } from "./store/appStore";
import "./custom.css";

function App() {
  const questions = useAppStore((state) => state.questions);
  const [prevQuestionCount, setPrevQuestionCount] = React.useState(0);

  React.useEffect(() => {
    // if new question is added scroll bottom
    if (questions.length > prevQuestionCount) {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      if (windowHeight + window.scrollY < fullHeight) {
        window.scrollBy({
          top: windowHeight / 2,
          behavior: "smooth",
        });
      }
    }
    setPrevQuestionCount(questions.length);
  }, [questions]);

  return (
    <div className="container">
      <AnimatePresence>
        {questions.map((question, idx) => (
          <QuestionCard key={question.id} question={question} index={idx} />
        ))}
        {/* {result && (
          <motion.div
            className="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              x: -10,
            }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <button onClick={reset}>reset</button>
            {result.type}
          </motion.div>
        )} */}
      </AnimatePresence>
    </div>
  );
}

export default App;
