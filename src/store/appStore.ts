import { data } from "@/data";
import { GivenAnswer, Question } from "@/types";
import { create } from "zustand";

interface AppState {
  questions: Question[];
  userAnswers: GivenAnswer[];
}

interface AppAction {
  addAnswer: (answerId: number, questionId: number) => void;
  sliceAnswers: (lastQuestion: Question) => void;
  resetAnswers: () => void;
  addQuestion: (question: Question) => void;
  sliceQuestions: (lastQuestion: Question) => void;
  resetQuestions: () => void;
}

export const useAppStore = create<AppState & AppAction>()((set) => ({
  questions: [data.question],
  userAnswers: [],
  addAnswer: (answerId, questionId) =>
    set((state) => ({
      ...state,
      userAnswers: [...state.userAnswers, { answerId, questionId }],
    })),
  sliceAnswers: (lastQuestion) =>
    set((state) => {
      const questionIdx = state.userAnswers.findIndex(
        (userAnswer) => userAnswer.questionId == lastQuestion.id
      );
      const updatedUserAnswers = state.userAnswers.slice(0, questionIdx);
      return { ...state, userAnswers: updatedUserAnswers };
    }),
  resetAnswers: () =>
    set((state) => ({
      ...state,
      userAnswers: [],
    })),
  addQuestion: (question) =>
    set((state) => ({ ...state, questions: [...state.questions, question] })),
  sliceQuestions: (lastQuestion) =>
    set((state) => {
      const questionIdx = state.questions.findIndex(
        (q) => q.id == lastQuestion.id
      );
      const updatedQuestions = state.questions.slice(0, questionIdx + 1);
      return { ...state, questions: updatedQuestions };
    }),
  resetQuestions: () =>
    set((state) => ({
      ...state,
      questions: [data.question],
    })),
}));
