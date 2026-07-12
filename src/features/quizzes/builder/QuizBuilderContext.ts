import { createContext, useContext } from "react";
export const QuizBuilderContext = createContext<any>(null);
export const useQuizBuilder = () => useContext(QuizBuilderContext);
