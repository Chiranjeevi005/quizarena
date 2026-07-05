"use server";

import { QuestionSearchRepository, QuestionSearchFilters } from "../repositories/QuestionSearchRepository";

/**
 * Server Action for searching questions from the Question Explorer.
 */
export async function searchQuestionsAction(filters: QuestionSearchFilters) {
  try {
    const results = await QuestionSearchRepository.searchQuestions(filters);
    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Failed to search questions:", error);
    return {
      success: false,
      error: "Failed to fetch search results.",
      data: [],
    };
  }
}
