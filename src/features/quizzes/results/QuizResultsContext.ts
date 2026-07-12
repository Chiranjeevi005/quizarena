import { createContext, useContext } from "react";
export const QuizResultsContext = createContext<any>(null);
export const useQuizResults = () => useContext(QuizResultsContext);
