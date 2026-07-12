import { createContext, useContext } from "react";
export const QuizSessionContext = createContext<any>(null);
export const useQuizSession = () => useContext(QuizSessionContext);
