// Personality matching algorithm for Amnesty International Interactive Experience
import { UserResponse, UserResult, QuestionDimensionMapping, EnhancedUserResult } from './types';
import { questionDimensionMappings } from './questionDimensionMappings';
import { personalityTypes } from './personalityTypes';
import { dimensions } from './dimensions';
import { amnestyCauses } from './amnestyCauses';

/**
 * Calculate dimension scores based on user responses
 * @param responses Array of user responses (agree/disagree)
 * @returns Object mapping dimension IDs to scores
 */
export function calculateDimensionScores(responses: UserResponse[]): Record<number, number> {
  // Initialize scores for all dimensions to 0
  const dimensionScores: Record<number, number> = {};
  const dimensionCounts: Record<number, number> = {};
  
  dimensions.forEach(dimension => {
    dimensionScores[dimension.id] = 0;
    dimensionCounts[dimension.id] = 0;
  });

  // Process each response
  responses.forEach(response => {
    // Find all dimension mappings for this question
    const mappings = questionDimensionMappings.filter(
      mapping => mapping.questionId === response.questionId
    );

    // Update scores based on response
    mappings.forEach(mapping => {
      // If user agrees, add the weight; if disagrees, subtract the weight
      const scoreChange = response.agree ? mapping.weight : -mapping.weight;
      dimensionScores[mapping.dimensionId] += scoreChange;
      dimensionCounts[mapping.dimensionId]++; // Count how many questions affect each dimension
    });
  });

  // Normalize scores to a scale of -10 to 10, but account for number of questions per dimension
  dimensions.forEach(dimension => {
    const dimId = dimension.id;
    const rawScore = dimensionScores[dimId];
    const questionCount = dimensionCounts[dimId];
    
    if (questionCount > 0) {
      // Normalize based on actual questions answered for this dimension
      // This prevents dimensions with fewer questions from being under-represented
      const avgScorePerQuestion = rawScore / questionCount;
      
      // Scale to -10 to 10 range, with a factor to make scores more pronounced
      // The 3 is based on our weight scale of -3 to 3
      dimensionScores[dimId] = Math.max(-10, Math.min(10, avgScorePerQuestion * (10/3)));
      
      // Add a small amount of random variation to encourage different results
      // This will matter less for dimensions with more questions and more for those with fewer
      const randomVariation = (Math.random() - 0.5) * (6 / Math.max(1, questionCount));
      dimensionScores[dimId] += randomVariation;
      dimensionScores[dimId] = Math.max(-10, Math.min(10, dimensionScores[dimId]));
    } else {
      // If no questions affected this dimension, use a small random value
      dimensionScores[dimId] = (Math.random() * 4) - 2; // Random value between -2 and 2
    }
  });

  return dimensionScores;
}

/**
 * Determine the best matching personality type based on dimension scores
 * @param dimensionScores Object mapping dimension IDs to scores
 * @returns ID of the best matching personality type
 */
export function findMatchingPersonalityType(dimensionScores: Record<number, number>): number {
  // Personality type matching profiles
  // Each profile defines the expected dimension scores for a personality type
  const personalityProfiles: Record<number, Record<number, number>> = {
    // Den Globale Aktivisten (The Global Activist)
    1: {
      1: 8,  // High on activism
      2: 9,  // High on universal values
      3: 5,  // Moderate on individual liberty
      4: -7, // Low on sovereignty (favors international intervention)
      5: 6,  // Moderately high on equality
      6: -3, // Slightly low on security (favors privacy)
      7: 4,  // Moderate on empathy
      8: 7,  // High on economic justice
      9: 8,  // High on humanity
      10: 0  // Neutral on reform vs system change
    },
    
    // Den Medfølende Forsvareren (The Compassionate Defender)
    2: {
      1: 3,  // Moderate on activism
      2: 6,  // Moderately high on universal values
      3: 2,  // Slightly positive on individual liberty
      4: -2, // Slightly low on sovereignty
      5: 5,  // Moderately high on equality
      6: -1, // Slightly low on security
      7: 9,  // Very high on empathy
      8: 4,  // Moderate on economic justice
      9: 9,  // Very high on humanity
      10: 3  // Moderate on reform
    },
    
    // Frihetsforkjemperen (The Liberty Advocate)
    3: {
      1: 5,  // Moderately high on activism
      2: 3,  // Moderate on universal values
      3: 10, // Very high on individual liberty
      4: 2,  // Slightly high on sovereignty
      5: -5, // Low on equality (favors liberty)
      6: -9, // Very low on security (strongly favors privacy)
      7: 0,  // Neutral on empathy vs principles
      8: -7, // Low on economic justice (favors market freedom)
      9: 3,  // Moderate on humanity
      10: 0  // Neutral on reform vs system change
    },
    
    // Likestillingsforkjemperen (The Equality Champion)
    4: {
      1: 6,  // Moderately high on activism
      2: 7,  // High on universal values
      3: 0,  // Neutral on individual liberty vs collective responsibility
      4: -3, // Moderately low on sovereignty
      5: 10, // Very high on equality
      6: 0,  // Neutral on security vs privacy
      7: 5,  // Moderately high on empathy
      8: 8,  // High on economic justice
      9: 6,  // Moderately high on humanity
      10: 4  // Moderate on reform
    },
    
    // Den Pragmatiske Reformatoren (The Pragmatic Reformer)
    5: {
      1: -6, // Low on activism (favors gradual change)
      2: 2,  // Slightly positive on universal values
      3: 0,  // Neutral on individual liberty vs collective responsibility
      4: 3,  // Moderate on sovereignty
      5: 2,  // Slightly positive on equality
      6: 3,  // Moderate on security
      7: -2, // Slightly low on empathy (favors principles)
      8: 0,  // Neutral on economic justice vs market freedom
      9: -5, // Low on humanity (favors pragmatism)
      10: 9  // Very high on reform
    },
    
    // Tradisjonsvokteren (The Tradition Guardian)
    6: {
      1: -8, // Very low on activism (strongly favors gradual change)
      2: -9, // Very low on universal values (strongly favors cultural relativism)
      3: -3, // Moderately low on individual liberty (favors collective responsibility)
      4: 9,  // Very high on sovereignty
      5: -4, // Moderately low on equality (favors liberty)
      6: 7,  // High on security
      7: -3, // Moderately low on empathy (favors principles)
      8: -5, // Low on economic justice (favors market freedom)
      9: -2, // Slightly low on humanity (favors pragmatism)
      10: 2  // Slightly positive on reform
    },
    
    // Systemkritikeren (The System Critic)
    7: {
      1: 7,  // High on activism
      2: 4,  // Moderate on universal values
      3: -2, // Slightly low on individual liberty (favors collective responsibility)
      4: 0,  // Neutral on sovereignty
      5: 8,  // High on equality
      6: -4, // Moderately low on security (favors privacy)
      7: 3,  // Moderate on empathy
      8: 10, // Very high on economic justice
      9: 5,  // Moderately high on humanity
      10: -9 // Very low on reform (strongly favors system change)
    },
    
    // Rettstatsforkjemperen (The Rule of Law Advocate)
    8: {
      1: -7, // Low on activism (favors gradual change)
      2: 5,  // Moderately high on universal values
      3: 3,  // Moderate on individual liberty
      4: 4,  // Moderate on sovereignty
      5: 6,  // Moderately high on equality
      6: 5,  // Moderately high on security
      7: -5, // Low on empathy (favors principles)
      8: 2,  // Slightly positive on economic justice
      9: 0,  // Neutral on humanity vs pragmatism
      10: 8  // High on reform
    },
    
    // Miljørettighetsaktivisten (The Environmental Rights Activist)
    9: {
      1: 8,  // High on activism
      2: 6,  // Moderately high on universal values
      3: -4, // Moderately low on individual liberty (favors collective responsibility)
      4: -2, // Slightly low on sovereignty
      5: 5,  // Moderately high on equality
      6: 0,  // Neutral on security vs privacy
      7: 7,  // High on empathy
      8: 6,  // Moderately high on economic justice
      9: 8,  // High on humanity
      10: -6 // Low on reform (favors system change)
    }
  };

  // Calculate similarity scores for each personality type
  const similarityScores: Record<number, number> = {};
  
  Object.entries(personalityProfiles).forEach(([typeId, profile]) => {
    let similarity = 0;
    let weightsSum = 0;
    
    // Calculate weighted Euclidean distance (lower is better)
    Object.entries(profile).forEach(([dimensionId, expectedScore]) => {
      const dimId = Number(dimensionId);
      const userScore = dimensionScores[dimId] || 0;
      const difference = userScore - expectedScore;
      
      // Give more weight to extreme expected scores (values near -10 or 10)
      // These are more defining characteristics of personality types
      const weight = Math.abs(expectedScore) / 5;
      weightsSum += weight;
      
      similarity -= (difference * difference * weight); // Negative weighted squared difference
    });
    
    // Normalize by sum of weights to make comparison fair
    if (weightsSum > 0) {
      similarity = similarity / weightsSum;
    }
    
    // Add a small random factor to break ties and encourage variety
    // The factor is small enough that it won't override clear matches,
    // but will help differentiate between close matches
    const randomFactor = Math.random() * 0.5;
    similarity += randomFactor;
    
    similarityScores[Number(typeId)] = similarity;
  });
  
  // Find personality type with highest similarity score
  let bestMatchTypeId = 1;
  let highestSimilarity = Number.NEGATIVE_INFINITY;
  
  Object.entries(similarityScores).forEach(([typeId, score]) => {
    if (score > highestSimilarity) {
      highestSimilarity = score;
      bestMatchTypeId = Number(typeId);
    }
  });
  
  return bestMatchTypeId;
}

/**
 * Find recommended Amnesty causes based on personality type
 * @param personalityTypeId ID of the matched personality type
 * @returns Array of recommended cause IDs
 */
export function findRecommendedCauses(personalityTypeId: number): number[] {
  // Mapping of personality types to recommended causes
  // In a real implementation, this would come from the database
  const recommendationMap: Record<number, number[]> = {
    1: [1, 4, 8],    // Global Activist: Refugee Rights, Death Penalty Abolition, Protection in Conflict Zones
    2: [1, 9, 6],    // Compassionate Defender: Refugee Rights, Women's Rights, LGBTQ+ Rights
    3: [2, 7, 4],    // Liberty Advocate: Freedom of Expression, Privacy and Surveillance, Death Penalty Abolition
    4: [6, 9, 5],    // Equality Champion: LGBTQ+ Rights, Women's Rights, Freedom of Assembly
    5: [3, 8, 2],    // Pragmatic Reformer: Corporate Accountability, Protection in Conflict Zones, Freedom of Expression
    6: [10, 2, 3],   // Tradition Guardian: Indigenous Rights, Freedom of Expression, Corporate Accountability
    7: [3, 5, 8],    // System Critic: Corporate Accountability, Freedom of Assembly, Protection in Conflict Zones
    8: [4, 2, 7],    // Rule of Law Advocate: Death Penalty Abolition, Freedom of Expression, Privacy and Surveillance
    9: [10, 3, 8]    // Environmental Rights Activist: Indigenous Rights, Corporate Accountability, Protection in Conflict Zones
  };
  
  return recommendationMap[personalityTypeId] || [1, 2, 3]; // Default recommendations if no match
}

/**
 * Generate a complete user result based on responses
 * @param responses Array of user responses
 * @returns Complete user result with personality type, dimension scores, and recommended causes
 */
export function generateUserResult(responses: UserResponse[], sessionId: string): UserResult {
  // Calculate dimension scores
  const dimensionScores = calculateDimensionScores(responses);
  
  // Find matching personality type
  const personalityTypeId = findMatchingPersonalityType(dimensionScores);
  
  // Find recommended causes
  const recommendedCauses = findRecommendedCauses(personalityTypeId);
  
  return {
    sessionId,
    personalityTypeId,
    dimensionScores,
    recommendedCauses
  };
}

/**
 * Generate an enhanced user result with all related data for display
 * @param responses Array of user responses
 * @param sessionId Session identifier
 * @returns Enhanced user result with full details for UI display
 */
export function generateEnhancedUserResult(responses: UserResponse[], sessionId: string): EnhancedUserResult {
  // Generate the basic user result
  const userResult = generateUserResult(responses, sessionId);
  
  // Get the personality type
  const personalityType = personalityTypes.find(p => p.id === userResult.personalityTypeId);
  
  // Format dimension details and sort by absolute score (highest first)
  const dimensionDetails = Object.entries(userResult.dimensionScores)
    .map(([dimId, score]) => {
      const dimension = dimensions.find(d => d.id === Number(dimId));
      return {
        dimension,
        score,
        description: score > 0 ? dimension?.highDescription : dimension?.lowDescription
      };
    })
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
  
  // Get the recommended causes
  const causes = userResult.recommendedCauses.map(causeId => 
    amnestyCauses.find(c => c.id === causeId)
  );
  
  return {
    userResult,
    personalityType,
    dimensionDetails,
    causes
  };
}
