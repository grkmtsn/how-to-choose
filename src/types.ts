export type Component = { type: "Select" | "Search" | "Combobox" } | null;

export type Answer = {
  id: number;
  label: string;
  component: Component;
  question: Question;
  level: "success" | "danger" | "natural";
};

export type Question = {
  id: number;
  label: string;
  answers: Answer[];
};

export type GivenAnswer = {
  questionId: number;
  answerId: number;
};
