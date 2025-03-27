'use client';

// Test component for personality matching algorithm
import { useState } from 'react';
import { UserResponse } from '@/lib/data/types';
import { allQuestions } from '@/lib/data/questions';
import { dimensions } from '@/lib/data/dimensions';
import { personalityTypes } from '@/lib/data/personalityTypes';
import { amnestyCauses } from '@/lib/data/amnestyCauses';
import { generateUserResult, calculateDimensionScores, findMatchingPersonalityType } from '@/lib/data/personalityMatching';

export default function PersonalityMatchingTest() {
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<any>(null);
  const [testMode, setTestMode] = useState<'random' | 'specific'>('random');
  const [selectedPersonality, setSelectedPersonality] = useState<number>(1);

  // Generate random responses
  const generateRandomResponses = () => {
    const randomResponses: UserResponse[] = allQuestions.map(question => ({
      questionId: question.id,
      agree: Math.random() > 0.5 // Random true/false
    }));
    
    setResponses(randomResponses);
    return randomResponses;
  };

  // Generate responses that would likely match a specific personality type
  const generateSpecificResponses = (personalityTypeId: number) => {
    // This is a simplified approach - in a real implementation, we would have more sophisticated logic
    // based on the question-dimension mappings and personality profiles
    
    // For now, we'll just bias the responses based on the personality type
    const biasedResponses: UserResponse[] = allQuestions.map(question => {
      let bias = 0.5; // Default 50/50 chance
      
      // Adjust bias based on personality type
      switch (personalityTypeId) {
        case 1: // Global Activist
          bias = question.categoryId === 1 || question.categoryId === 8 ? 0.8 : 0.5; // More likely to agree with refugee and international questions
          break;
        case 2: // Compassionate Defender
          bias = question.categoryId === 1 || question.categoryId === 9 ? 0.8 : 0.5; // More likely to agree with refugee and women's rights questions
          break;
        case 3: // Liberty Advocate
          bias = question.categoryId === 2 || question.categoryId === 7 ? 0.8 : 0.5; // More likely to agree with expression and privacy questions
          break;
        // Add more cases for other personality types
        default:
          bias = 0.5;
      }
      
      return {
        questionId: question.id,
        agree: Math.random() < bias
      };
    });
    
    setResponses(biasedResponses);
    return biasedResponses;
  };

  // Run the test
  const runTest = () => {
    let testResponses: UserResponse[];
    
    if (testMode === 'random') {
      testResponses = generateRandomResponses();
    } else {
      testResponses = generateSpecificResponses(selectedPersonality);
    }
    
    const sessionId = `test-${Date.now()}`;
    const userResult = generateUserResult(testResponses, sessionId);
    
    // Get the personality type and causes
    const matchedPersonality = personalityTypes.find(p => p.id === userResult.personalityTypeId);
    const recommendedCauses = userResult.recommendedCauses.map(causeId => 
      amnestyCauses.find(c => c.id === causeId)
    );
    
    setResult({
      ...userResult,
      personalityType: matchedPersonality,
      causes: recommendedCauses,
      dimensionDetails: Object.entries(userResult.dimensionScores).map(([dimId, score]) => {
        const dimension = dimensions.find(d => d.id === Number(dimId));
        return {
          dimension,
          score,
          description: score > 0 ? dimension?.highDescription : dimension?.lowDescription
        };
      })
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Personality Matching Algorithm Test</h1>
      
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Test Configuration</h2>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="testMode"
              checked={testMode === 'random'}
              onChange={() => setTestMode('random')}
              className="mr-2"
            />
            Random Responses
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="testMode"
              checked={testMode === 'specific'}
              onChange={() => setTestMode('specific')}
              className="mr-2"
            />
            Target Specific Personality
          </label>
        </div>
        
        {testMode === 'specific' && (
          <div className="mb-4">
            <label className="block mb-2">Target Personality Type:</label>
            <select
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {personalityTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <button
          onClick={runTest}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Run Test
        </button>
      </div>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Matched Personality Type</h3>
            <div className="mb-2">
              <span className="font-bold">{result.personalityType?.name}</span>
            </div>
            <p className="text-gray-700">{result.personalityType?.description}</p>
            <div className="mt-2 text-sm text-gray-600">
              Main values: {result.personalityType?.mainValues}
            </div>
          </div>
          
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Dimension Scores</h3>
            <div className="space-y-3">
              {result.dimensionDetails.sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{detail.dimension?.name}</span>
                    <span className="font-bold">{detail.score.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${detail.score > 0 ? 'bg-blue-600' : 'bg-red-600'}`}
                      style={{
                        width: `${Math.abs(detail.score) * 5 + 50}%`,
                        marginLeft: detail.score < 0 ? 0 : '50%',
                        marginRight: detail.score > 0 ? 0 : '50%',
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {detail.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Recommended Causes</h3>
            <div className="space-y-4">
              {result.causes.map((cause, index) => (
                <div key={index} className="p-3 border rounded bg-white">
                  <h4 className="font-bold">{cause?.name}</h4>
                  <p className="text-gray-700 text-sm mt-1">{cause?.description}</p>
                  <div className="mt-2 text-sm">
                    <div><span className="font-medium">Status:</span> {cause?.status}</div>
                    <div className="mt-1"><span className="font-medium">Handlinger:</span> {cause?.actions}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
