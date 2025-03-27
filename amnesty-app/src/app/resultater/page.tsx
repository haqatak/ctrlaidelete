'use client';

import { useState, useEffect } from 'react';
import { EnhancedUserResult } from '@/lib/data/types';
import { generateEnhancedUserResult } from '@/lib/data/personalityMatching';
import SocialSharing from '@/components/ui/SocialSharing';

export default function ResultsScreen() {
  const [result, setResult] = useState<EnhancedUserResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get responses from sessionStorage
      const responsesJson = sessionStorage.getItem('userResponses');
      
      if (responsesJson) {
        try {
          const responses = JSON.parse(responsesJson);
          
          // Generate enhanced result using our algorithm
          const sessionId = `session-${Date.now()}`;
          const enhancedResult = generateEnhancedUserResult(responses, sessionId);
          
          // Store personality name for sharing
          if (enhancedResult.personalityType?.name) {
            sessionStorage.setItem('personalityName', enhancedResult.personalityType.name);
          }
          
          setResult(enhancedResult);
        } catch (error) {
          console.error('Error processing results:', error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="amnesty-container">Laster resultater...</div>;
  }

  if (!result) {
    return (
      <div className="amnesty-container">
        <div className="error-message">
          <h2>Kunne ikke laste resultatene</h2>
          <p>Det oppstod et problem med å beregne resultatene dine. Gå tilbake og prøv igjen.</p>
          <button 
            className="nav-button nav-button-primary"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/sporsmal';
              }
            }}
          >
            Tilbake til spørsmål
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="amnesty-container">
      <header className="amnesty-header">
        <img 
          src="https://amnesty.no/sites/default/files/vedlegg/yellow_logo_print_use.jpg" 
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
          
          <div className="causes-section">
            <h2 className="results-title">Anbefalte saker for deg</h2>
            <div className="causes-container">
              {result.causes.map((cause, index) => (
                cause && (
                  <div key={index} className="cause-card">
                    <h3 className="cause-name">{cause.name}</h3>
                    <p className="cause-description">{cause.description}</p>
                    {cause.linkUrl && (
                      <a 
                        href={cause.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cause-link"
                      >
                        Les mer
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
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
