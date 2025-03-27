'use client';

import { useState, useEffect } from 'react';
import { UserResult, PersonalityType, Dimension, AmnestyCause } from '@/lib/data/types';
import { personalityTypes } from '@/lib/data/personalityTypes';
import { dimensions } from '@/lib/data/dimensions';
import { amnestyCauses } from '@/lib/data/amnestyCauses';
import { generateUserResult } from '@/lib/data/personalityMatching';
import SocialSharing from '@/components/ui/SocialSharing';

export default function ResultsScreen() {
  const [result, setResult] = useState<{
    userResult: UserResult;
    personalityType: PersonalityType | undefined;
    dimensionDetails: Array<{
      dimension: Dimension | undefined;
      score: number;
      description: string | undefined;
    }>;
    causes: (AmnestyCause | undefined)[];
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get responses from sessionStorage
      const responsesJson = sessionStorage.getItem('userResponses');
      
      if (responsesJson) {
        try {
          const responses = JSON.parse(responsesJson);
          
          // Generate result using our algorithm
          const sessionId = `session-${Date.now()}`;
          const userResult = generateUserResult(responses, sessionId);
          
          // Get the personality type
          const matchedPersonality = personalityTypes.find(p => p.id === userResult.personalityTypeId);
          
          // Store personality name for sharing
          if (matchedPersonality?.name) {
            sessionStorage.setItem('personalityName', matchedPersonality.name);
          }
          
          // Get the recommended causes
          const recommendedCauses = userResult.recommendedCauses.map(causeId => 
            amnestyCauses.find(c => c.id === causeId)
          );
          
          // Format dimension details
          const dimensionDetails = Object.entries(userResult.dimensionScores).map(([dimId, score]) => {
            const dimension = dimensions.find(d => d.id === Number(dimId));
            return {
              dimension,
              score,
              description: score > 0 ? dimension?.highDescription : dimension?.lowDescription
            };
          });
          
          // Sort dimensions by absolute score (highest first)
          dimensionDetails.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
          
          setResult({
            userResult,
            personalityType: matchedPersonality,
            dimensionDetails,
            causes: recommendedCauses
          });
          
        } catch (error) {
          console.error('Error processing results:', error);
        }
      }
    } else {
      // Server-side rendering - set default state
      setResult(null);
    }
  }, []);

  if (!result) {
    return <div className="amnesty-container">Laster resultater...</div>;
  }

  return (
    <div className="amnesty-container">
      <header className="amnesty-header">
        <img 
          src="/images/amnesty-logo.png" 
          alt="Amnesty International" 
          className="amnesty-logo"
        />
      </header>
      
      <main className="amnesty-content">
        <div className="results-screen">
          <h1 className="results-title">Dine resultater</h1>
          
          <div className="personality-card">
            <h2 className="personality-name">{result.personalityType?.name}</h2>
            <p className="personality-description">{result.personalityType?.description}</p>
            <p className="personality-values">
              <strong>Hovedverdier:</strong> {result.personalityType?.mainValues}
            </p>
          </div>
          
          <h2 className="results-title">Din verdiprofil</h2>
          
          <div className="dimensions-container">
            {result.dimensionDetails.map((detail, index) => (
              <div key={index} className="dimension-item">
                <div className="dimension-header">
                  <span className="dimension-name">{detail.dimension?.name}</span>
                  <span className="dimension-score">{detail.score.toFixed(1)}</span>
                </div>
                
                <div className="dimension-bar-container">
                  {detail.score > 0 ? (
                    <div 
                      className="dimension-bar dimension-bar-positive"
                      style={{ width: `${Math.abs(detail.score) * 5}%` }}
                    ></div>
                  ) : (
                    <div 
                      className="dimension-bar dimension-bar-negative"
                      style={{ width: `${Math.abs(detail.score) * 5}%` }}
                    ></div>
                  )}
                </div>
                
                <div className="dimension-description">
                  {detail.description}
                </div>
              </div>
            ))}
          </div>
          
          <SocialSharing 
            personalityType={result.personalityType?.name || ''}
            personalityDescription={result.personalityType?.description}
          />
          
          <div className="nav-buttons">
            <button 
              className="nav-button nav-button-primary"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/handling';
                }
              }}
            >
              Hva kan JEG gjøre?
            </button>
          </div>
        </div>
      </main>
      
      <footer className="amnesty-footer">
        <p>© {new Date().getFullYear()} Amnesty International Norge</p>
      </footer>
    </div>
  );
}
