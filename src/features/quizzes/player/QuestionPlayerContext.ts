import { createContext, useContext } from "react";
export const QuestionPlayerContext = createContext<any>(null);
export const useQuestionPlayer = () => useContext(QuestionPlayerContext);
