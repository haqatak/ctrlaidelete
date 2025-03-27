// Question-dimension mappings for Amnesty International Interactive Experience
import { QuestionDimensionMapping } from './types';

// This file maps each question to relevant dimensions with weights
// Positive weights indicate the question aligns with the high description of the dimension
// Negative weights indicate the question aligns with the low description of the dimension
// Weight scale: -3 (strongly low) to +3 (strongly high)

export const questionDimensionMappings: QuestionDimensionMapping[] = [
  // Refugee Rights & Migration (Category 1)
  { questionId: 1, dimensionId: 2, weight: 3 },  // Universal rights
  { questionId: 1, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 1, dimensionId: 9, weight: 2 },  // Humanity
  
  { questionId: 2, dimensionId: 2, weight: 3 },  // Universal rights
  { questionId: 2, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 2, dimensionId: 9, weight: 2 },  // Humanity
  
  { questionId: 3, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 3, dimensionId: 4, weight: -2 }, // International intervention
  { questionId: 3, dimensionId: 9, weight: 2 },  // Humanity
  
  { questionId: 4, dimensionId: 5, weight: 1 },  // Equality
  { questionId: 4, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 5, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 5, dimensionId: 7, weight: 1 },  // Empathy
  
  { questionId: 6, dimensionId: 2, weight: -2 }, // Cultural relativism
  { questionId: 6, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 7, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 7, dimensionId: 8, weight: 1 },  // Economic justice
  
  { questionId: 8, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 8, dimensionId: 7, weight: -2 }, // Principles over empathy
  
  { questionId: 9, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 9, dimensionId: 9, weight: -2 }, // Pragmatism over humanity
  
  { questionId: 10, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 10, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 11, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 11, dimensionId: 9, weight: -1 }, // Pragmatism
  
  { questionId: 12, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 12, dimensionId: 5, weight: 3 },  // Equality
  
  // Freedom of Expression & Information (Category 2)
  { questionId: 13, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 13, dimensionId: 5, weight: -2 }, // Liberty over equality
  
  { questionId: 14, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 14, dimensionId: 5, weight: 2 },  // Equality
  
  { questionId: 15, dimensionId: 3, weight: -3 }, // Collective responsibility
  { questionId: 15, dimensionId: 6, weight: 2 },  // Security
  
  { questionId: 16, dimensionId: 3, weight: -3 }, // Collective responsibility
  { questionId: 16, dimensionId: 6, weight: 3 },  // Security
  
  { questionId: 17, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 17, dimensionId: 6, weight: 2 },  // Security
  
  { questionId: 18, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 18, dimensionId: 6, weight: -2 }, // Privacy over security
  
  { questionId: 19, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 19, dimensionId: 3, weight: 3 },  // Individual liberty
  
  { questionId: 20, dimensionId: 3, weight: -3 }, // Collective responsibility
  { questionId: 20, dimensionId: 6, weight: 3 },  // Security
  
  { questionId: 21, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 21, dimensionId: 5, weight: 1 },  // Equality
  
  { questionId: 22, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 22, dimensionId: 7, weight: 1 },  // Empathy
  
  // Economic & Corporate Responsibility (Category 3)
  { questionId: 23, dimensionId: 8, weight: 3 },  // Economic justice
  { questionId: 23, dimensionId: 10, weight: -1 }, // System change
  
  { questionId: 24, dimensionId: 1, weight: 2 },  // Activism
  { questionId: 24, dimensionId: 4, weight: -2 }, // International intervention
  
  { questionId: 25, dimensionId: 8, weight: 3 },  // Economic justice
  { questionId: 25, dimensionId: 2, weight: 2 },  // Universal rights
  
  { questionId: 26, dimensionId: 2, weight: 3 },  // Universal rights
  { questionId: 26, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 27, dimensionId: 8, weight: 2 },  // Economic justice
  { questionId: 27, dimensionId: 9, weight: 1 },  // Humanity
  
  { questionId: 28, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 28, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 29, dimensionId: 4, weight: 3 },  // Sovereignty
  { questionId: 29, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 30, dimensionId: 8, weight: -3 }, // Market freedom
  { questionId: 30, dimensionId: 3, weight: 2 },  // Individual liberty
  
  { questionId: 31, dimensionId: 1, weight: 2 },  // Activism
  { questionId: 31, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 32, dimensionId: 8, weight: -3 }, // Market freedom
  { questionId: 32, dimensionId: 3, weight: 2 },  // Individual liberty
  
  // Criminal Justice & Death Penalty (Category 4)
  { questionId: 33, dimensionId: 7, weight: -3 }, // Principles
  { questionId: 33, dimensionId: 9, weight: -2 }, // Pragmatism
  
  { questionId: 34, dimensionId: 7, weight: -2 }, // Principles
  { questionId: 34, dimensionId: 9, weight: -2 }, // Pragmatism
  
  { questionId: 35, dimensionId: 7, weight: -3 }, // Principles
  { questionId: 35, dimensionId: 9, weight: -2 }, // Pragmatism
  
  { questionId: 36, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 36, dimensionId: 5, weight: 2 },  // Equality
  
  { questionId: 37, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 37, dimensionId: 9, weight: 1 },  // Humanity
  
  { questionId: 38, dimensionId: 9, weight: 2 },  // Humanity
  { questionId: 38, dimensionId: 10, weight: 2 }, // Reform
  
  { questionId: 39, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 39, dimensionId: 9, weight: 1 },  // Humanity
  
  { questionId: 40, dimensionId: 7, weight: -2 }, // Principles
  { questionId: 40, dimensionId: 9, weight: -1 }, // Pragmatism
  
  { questionId: 41, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 41, dimensionId: 10, weight: 1 }, // Reform
  
  { questionId: 42, dimensionId: 7, weight: 2 },  // Empathy
  { questionId: 42, dimensionId: 9, weight: 1 },  // Humanity
  
  // Protest & Civil Disobedience (Category 5)
  { questionId: 43, dimensionId: 1, weight: 3 },  // Activism
  { questionId: 43, dimensionId: 3, weight: 2 },  // Individual liberty
  
  { questionId: 44, dimensionId: 1, weight: 3 },  // Activism
  { questionId: 44, dimensionId: 10, weight: -2 }, // System change
  
  { questionId: 45, dimensionId: 6, weight: 2 },  // Security
  { questionId: 45, dimensionId: 1, weight: -2 }, // Gradual change
  
  { questionId: 46, dimensionId: 1, weight: -2 }, // Gradual change
  { questionId: 46, dimensionId: 7, weight: -2 }, // Principles
  
  { questionId: 47, dimensionId: 1, weight: 3 },  // Activism
  { questionId: 47, dimensionId: 3, weight: 1 },  // Individual liberty
  
  { questionId: 48, dimensionId: 6, weight: 3 },  // Security
  { questionId: 48, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 49, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 49, dimensionId: 6, weight: -2 }, // Privacy
  
  { questionId: 50, dimensionId: 1, weight: 2 },  // Activism
  { questionId: 50, dimensionId: 8, weight: 1 },  // Economic justice
  
  // Identity & Discrimination (Category 6)
  { questionId: 51, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 51, dimensionId: 2, weight: 2 },  // Universal rights
  
  { questionId: 52, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 52, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  { questionId: 53, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 53, dimensionId: 5, weight: -2 }, // Liberty over equality
  
  { questionId: 54, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 54, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  { questionId: 55, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 55, dimensionId: 5, weight: 2 },  // Equality
  
  { questionId: 56, dimensionId: 2, weight: -2 }, // Cultural relativism
  { questionId: 56, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 57, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 57, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 58, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 58, dimensionId: 5, weight: -2 }, // Liberty over equality
  
  { questionId: 59, dimensionId: 5, weight: -1 }, // Liberty over equality
  { questionId: 59, dimensionId: 9, weight: -1 }, // Pragmatism
  
  { questionId: 60, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 60, dimensionId: 9, weight: 1 },  // Humanity
  
  // Privacy & Surveillance (Category 7)
  { questionId: 61, dimensionId: 6, weight: 3 },  // Security
  { questionId: 61, dimensionId: 3, weight: -3 }, // Collective responsibility
  
  { questionId: 62, dimensionId: 6, weight: -3 }, // Privacy
  { questionId: 62, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  { questionId: 63, dimensionId: 6, weight: -3 }, // Privacy
  { questionId: 63, dimensionId: 3, weight: 2 },  // Individual liberty
  
  { questionId: 64, dimensionId: 6, weight: 3 },  // Security
  { questionId: 64, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 65, dimensionId: 3, weight: 2 },  // Individual liberty
  { questionId: 65, dimensionId: 6, weight: -2 }, // Privacy
  
  { questionId: 66, dimensionId: 6, weight: 2 },  // Security
  { questionId: 66, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 67, dimensionId: 6, weight: 3 },  // Security
  { questionId: 67, dimensionId: 7, weight: -2 }, // Principles
  
  { questionId: 68, dimensionId: 6, weight: 2 },  // Security
  { questionId: 68, dimensionId: 3, weight: -2 }, // Collective responsibility
  
  { questionId: 69, dimensionId: 6, weight: -3 }, // Privacy
  { questionId: 69, dimensionId: 3, weight: 3 },  // Individual liberty
  
  { questionId: 70, dimensionId: 6, weight: 2 },  // Security
  { questionId: 70, dimensionId: 8, weight: -2 }, // Market freedom
  
  // International Interventions & Sovereignty (Category 8)
  { questionId: 71, dimensionId: 4, weight: -3 }, // International intervention
  { questionId: 71, dimensionId: 9, weight: 2 },  // Humanity
  
  { questionId: 72, dimensionId: 4, weight: -2 }, // International intervention
  { questionId: 72, dimensionId: 7, weight: -1 }, // Principles
  
  { questionId: 73, dimensionId: 4, weight: -3 }, // International intervention
  { questionId: 73, dimensionId: 2, weight: 3 },  // Universal rights
  
  { questionId: 74, dimensionId: 4, weight: 3 },  // Sovereignty
  { questionId: 74, dimensionId: 5, weight: -2 }, // Liberty over equality
  
  { questionId: 75, dimensionId: 4, weight: -2 }, // International intervention
  { questionId: 75, dimensionId: 3, weight: 2 },  // Individual liberty
  
  { questionId: 76, dimensionId: 4, weight: 3 },  // Sovereignty
  { questionId: 76, dimensionId: 6, weight: 2 },  // Security
  
  { questionId: 77, dimensionId: 1, weight: -2 }, // Gradual change
  { questionId: 77, dimensionId: 9, weight: -1 }, // Pragmatism
  
  { questionId: 78, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 78, dimensionId: 4, weight: -2 }, // International intervention
  
  { questionId: 79, dimensionId: 9, weight: -3 }, // Pragmatism
  { questionId: 79, dimensionId: 7, weight: -2 }, // Principles
  
  { questionId: 80, dimensionId: 4, weight: -2 }, // International intervention
  { questionId: 80, dimensionId: 2, weight: -1 }, // Cultural relativism
  
  // Gender & Women's Rights (Category 9)
  { questionId: 81, dimensionId: 2, weight: 3 },  // Universal rights
  { questionId: 81, dimensionId: 5, weight: 3 },  // Equality
  
  { questionId: 82, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 82, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  { questionId: 83, dimensionId: 3, weight: 3 },  // Individual liberty
  { questionId: 83, dimensionId: 7, weight: 1 },  // Empathy
  
  { questionId: 84, dimensionId: 2, weight: -2 }, // Cultural relativism
  { questionId: 84, dimensionId: 5, weight: -2 }, // Liberty over equality
  
  { questionId: 85, dimensionId: 2, weight: 2 },  // Universal rights
  { questionId: 85, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 86, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 86, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 87, dimensionId: 5, weight: -1 }, // Liberty over equality
  { questionId: 87, dimensionId: 9, weight: -1 }, // Pragmatism
  
  { questionId: 88, dimensionId: 5, weight: 3 },  // Equality
  { questionId: 88, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  { questionId: 89, dimensionId: 3, weight: -2 }, // Collective responsibility
  { questionId: 89, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 90, dimensionId: 8, weight: 2 },  // Economic justice
  { questionId: 90, dimensionId: 3, weight: -1 }, // Collective responsibility
  
  // Indigenous & Land Rights (Category 10)
  { questionId: 91, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 91, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 92, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 92, dimensionId: 8, weight: 2 },  // Economic justice
  
  { questionId: 93, dimensionId: 2, weight: -1 }, // Cultural relativism
  { questionId: 93, dimensionId: 5, weight: 2 },  // Equality
  
  { questionId: 94, dimensionId: 5, weight: 2 },  // Equality
  { questionId: 94, dimensionId: 2, weight: -1 }, // Cultural relativism
  
  { questionId: 95, dimensionId: 8, weight: 2 },  // Economic justice
  { questionId: 95, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 96, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 96, dimensionId: 2, weight: -2 }, // Cultural relativism
  
  { questionId: 97, dimensionId: 9, weight: -2 }, // Pragmatism
  { questionId: 97, dimensionId: 2, weight: -1 }, // Cultural relativism
  
  { questionId: 98, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 98, dimensionId: 7, weight: 2 },  // Empathy
  
  { questionId: 99, dimensionId: 4, weight: 2 },  // Sovereignty
  { questionId: 99, dimensionId: 2, weight: -2 }, // Cultural relativism
  
  { questionId: 100, dimensionId: 4, weight: -2 }, // International intervention
  { questionId: 100, dimensionId: 2, weight: 2 },  // Universal rights
];
