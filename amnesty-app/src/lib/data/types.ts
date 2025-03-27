// Types for Amnesty International Interactive Experience

// Question category
export interface Category {
  id: number;
  name: string;
  description?: string;
}

// Question with optional media
export interface Question {
  id: number;
  text: string;
  categoryId: number;
  imageUrl?: string;
  videoUrl?: string;
}

// Personality type
export interface PersonalityType {
  id: number;
  name: string;
  description: string;
  mainValues: string;
}

// Dimension in personality matrix
export interface Dimension {
  id: number;
  name: string;
  description: string;
  highDescription: string;
  lowDescription: string;
}

// Question-dimension mapping with weight
export interface QuestionDimensionMapping {
  questionId: number;
  dimensionId: number;
  weight: number; // Positive for high score, negative for low score
}

// Amnesty cause/project
export interface AmnestyCause {
  id: number;
  name: string;
  description: string;
  status: string;
  goals: string;
  actions: string;
  impact?: string;
  imageUrl?: string;
  linkUrl?: string;
}

// Personality-cause mapping with relevance score
export interface PersonalityCauseMapping {
  personalityTypeId: number;
  causeId: number;
  relevanceScore: number; // Higher means more relevant
}

// User result
export interface UserResult {
  sessionId: string;
  personalityTypeId: number;
  dimensionScores: Record<number, number>; // Dimension ID to score
  recommendedCauses: number[]; // Cause IDs
}

// User response to a question
export interface UserResponse {
  questionId: number;
  agree: boolean; // true for agree (right swipe), false for disagree (left swipe)
}

// Application state
export interface AppState {
  currentQuestionIndex: number;
  totalQuestions: number;
  responses: UserResponse[];
  result?: UserResult;
}

// Enhanced result with more detailed information for display
export interface EnhancedUserResult {
  userResult: UserResult;
  personalityType: PersonalityType | undefined;
  dimensionDetails: Array<{
    dimension: Dimension | undefined;
    score: number;
    description: string | undefined;
  }>;
  causes: (AmnestyCause | undefined)[];
}

// Formatted dimension detail for display
export interface DimensionDetail {
  dimension: Dimension | undefined;
  score: number;
  description: string | undefined;
}
