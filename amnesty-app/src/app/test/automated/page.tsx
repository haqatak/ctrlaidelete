// Test script for Amnesty International Interactive Experience
'use client';

import { useState, useEffect } from 'react';
import { allQuestions } from '@/lib/data/questions';
import { dimensions } from '@/lib/data/dimensions';
import { personalityTypes } from '@/lib/data/personalityTypes';
import { amnestyCauses } from '@/lib/data/amnestyCauses';
import { generateUserResult } from '@/lib/data/personalityMatching';

export default function TestPage() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Run browser compatibility test
  const testBrowserCompatibility = () => {
    const results = [];
    
    // Check for basic browser features
    results.push({
      name: 'Local Storage',
      result: typeof window.localStorage !== 'undefined' ? 'Pass' : 'Fail',
      details: typeof window.localStorage !== 'undefined' 
        ? 'Local storage is available' 
        : 'Local storage is not available'
    });
    
    results.push({
      name: 'Session Storage',
      result: typeof window.sessionStorage !== 'undefined' ? 'Pass' : 'Fail',
      details: typeof window.sessionStorage !== 'undefined' 
        ? 'Session storage is available' 
        : 'Session storage is not available'
    });
    
    results.push({
      name: 'Touch Events',
      result: 'ontouchstart' in window ? 'Pass' : 'Warning',
      details: 'ontouchstart' in window 
        ? 'Touch events are supported' 
        : 'Touch events may not be supported - swipe functionality might be limited'
    });
    
    results.push({
      name: 'Fetch API',
      result: typeof window.fetch !== 'undefined' ? 'Pass' : 'Fail',
      details: typeof window.fetch !== 'undefined' 
        ? 'Fetch API is available' 
        : 'Fetch API is not available'
    });
    
    results.push({
      name: 'CSS Grid',
      result: window.CSS && CSS.supports('display', 'grid') ? 'Pass' : 'Warning',
      details: window.CSS && CSS.supports('display', 'grid') 
        ? 'CSS Grid is supported' 
        : 'CSS Grid may not be supported - layout might be affected'
    });
    
    results.push({
      name: 'Flexbox',
      result: window.CSS && CSS.supports('display', 'flex') ? 'Pass' : 'Warning',
      details: window.CSS && CSS.supports('display', 'flex') 
        ? 'Flexbox is supported' 
        : 'Flexbox may not be supported - layout might be affected'
    });
    
    return results;
  };
  
  // Test personality matching algorithm
  const testPersonalityMatching = () => {
    const results = [];
    
    // Test with random responses
    const randomResponses = allQuestions.slice(0, 20).map(q => ({
      questionId: q.id,
      agree: Math.random() > 0.5
    }));
    
    const randomResult = generateUserResult(randomResponses, 'test-random');
    results.push({
      name: 'Random Responses Test',
      result: randomResult.personalityTypeId > 0 ? 'Pass' : 'Fail',
      details: `Matched to personality type: ${personalityTypes.find(p => p.id === randomResult.personalityTypeId)?.name}`
    });
    
    // Test with biased responses for each personality type
    personalityTypes.forEach(type => {
      // Create biased responses that should match this personality type
      // This is a simplified approach - in a real test, we would have more sophisticated test cases
      const biasedResponses = allQuestions.slice(0, 20).map(q => {
        let bias = 0.5;
        
        // Adjust bias based on personality type
        switch (type.id) {
          case 1: // Global Activist
            bias = q.categoryId === 1 || q.categoryId === 8 ? 0.8 : 0.2;
            break;
          case 2: // Compassionate Defender
            bias = q.categoryId === 1 || q.categoryId === 9 ? 0.8 : 0.2;
            break;
          // Add more cases for other personality types
          default:
            bias = 0.5;
        }
        
        return {
          questionId: q.id,
          agree: Math.random() < bias
        };
      });
      
      const biasedResult = generateUserResult(biasedResponses, `test-type-${type.id}`);
      results.push({
        name: `Biased Test for ${type.name}`,
        result: biasedResult.personalityTypeId === type.id ? 'Pass' : 'Warning',
        details: `Expected: ${type.name}, Got: ${personalityTypes.find(p => p.id === biasedResult.personalityTypeId)?.name}`
      });
    });
    
    return results;
  };
  
  // Test data integrity
  const testDataIntegrity = () => {
    const results = [];
    
    // Check if all questions have valid category IDs
    const invalidCategoryQuestions = allQuestions.filter(q => 
      !q.categoryId || q.categoryId < 1 || q.categoryId > 10
    );
    
    results.push({
      name: 'Question Categories',
      result: invalidCategoryQuestions.length === 0 ? 'Pass' : 'Fail',
      details: invalidCategoryQuestions.length === 0 
        ? 'All questions have valid category IDs' 
        : `${invalidCategoryQuestions.length} questions have invalid category IDs`
    });
    
    // Check if all personality types have descriptions
    const incompletePersonalityTypes = personalityTypes.filter(p => 
      !p.description || p.description.length < 10
    );
    
    results.push({
      name: 'Personality Type Descriptions',
      result: incompletePersonalityTypes.length === 0 ? 'Pass' : 'Fail',
      details: incompletePersonalityTypes.length === 0 
        ? 'All personality types have descriptions' 
        : `${incompletePersonalityTypes.length} personality types have missing or short descriptions`
    });
    
    // Check if all dimensions have descriptions
    const incompleteDimensions = dimensions.filter(d => 
      !d.highDescription || !d.lowDescription
    );
    
    results.push({
      name: 'Dimension Descriptions',
      result: incompleteDimensions.length === 0 ? 'Pass' : 'Fail',
      details: incompleteDimensions.length === 0 
        ? 'All dimensions have high and low descriptions' 
        : `${incompleteDimensions.length} dimensions have missing descriptions`
    });
    
    // Check if all causes have required fields
    const incompleteCauses = amnestyCauses.filter(c => 
      !c.description || !c.actions || !c.status
    );
    
    results.push({
      name: 'Amnesty Causes',
      result: incompleteCauses.length === 0 ? 'Pass' : 'Fail',
      details: incompleteCauses.length === 0 
        ? 'All causes have required fields' 
        : `${incompleteCauses.length} causes have missing required fields`
    });
    
    return results;
  };
  
  // Run all tests
  const runAllTests = () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);
    
    // Run tests sequentially with a small delay to show progress
    setTimeout(() => {
      const compatibilityResults = testBrowserCompatibility();
      setTestResults(prev => [...prev, { category: 'Browser Compatibility', tests: compatibilityResults }]);
      setProgress(33);
      
      setTimeout(() => {
        const matchingResults = testPersonalityMatching();
        setTestResults(prev => [...prev, { category: 'Personality Matching', tests: matchingResults }]);
        setProgress(66);
        
        setTimeout(() => {
          const dataResults = testDataIntegrity();
          setTestResults(prev => [...prev, { category: 'Data Integrity', tests: dataResults }]);
          setProgress(100);
          setIsRunning(false);
        }, 500);
      }, 500);
    }, 500);
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Suite for Amnesty Interactive Experience</h1>
      
      <div className="mb-6">
        <button 
          onClick={runAllTests}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>
        
        {isRunning && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Progress: {progress}%</p>
          </div>
        )}
      </div>
      
      {testResults.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{category.category}</h2>
          
          <div className="space-y-4">
            {category.tests.map((test, testIndex) => (
              <div 
                key={testIndex} 
                className={`p-4 rounded-lg ${
                  test.result === 'Pass' 
                    ? 'bg-green-100 border border-green-200' 
                    : test.result === 'Warning' 
                      ? 'bg-yellow-100 border border-yellow-200' 
                      : 'bg-red-100 border border-red-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{test.name}</h3>
                  <span 
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      test.result === 'Pass' 
                        ? 'bg-green-500 text-white' 
                        : test.result === 'Warning' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-red-500 text-white'
                    }`}
                  >
                    {test.result}
                  </span>
                </div>
                <p className="text-sm">{test.details}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Deployment Checklist</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ensure all tests pass before deployment</li>
          <li>Verify that all images and assets are properly loaded</li>
          <li>Test on multiple browsers (Chrome, Firefox, Safari, Edge)</li>
          <li>Test on multiple devices (desktop, tablet, mobile)</li>
          <li>Check performance using browser developer tools</li>
          <li>Verify that social sharing functionality works correctly</li>
          <li>Ensure all Norwegian text is correctly displayed</li>
          <li>Test with screen readers for accessibility</li>
        </ul>
      </div>
    </div>
  );
}
