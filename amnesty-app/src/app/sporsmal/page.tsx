'use client';

import { useState, useEffect } from 'react';
import { useSwipe } from '@/hooks/swipe/useSwipe';
import { Question } from '@/lib/data/types';
import { allQuestions } from '@/lib/data/questions';

export default function QuestionScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{questionId: number, agree: boolean}[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  
  // Initialize with a random selection of questions
  useEffect(() => {
    // Shuffle and select a subset of questions (e.g., 20 questions)
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setQuestions(selected);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleResponse = (agree: boolean) => {
    // Don't process if we're animating or no question is available
    if (isAnimating || !currentQuestion) return;
    
    // Set animation direction
    setAnimationDirection(agree ? 'right' : 'left');
    setIsAnimating(true);
    
    // Record response
    const newResponse = {
      questionId: currentQuestion.id,
      agree
    };
    
    // Add to responses array
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    
    // Wait for animation to complete
    setTimeout(() => {
      // Move to next question or results page
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Save responses to sessionStorage for the results page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('userResponses', JSON.stringify(updatedResponses));
          // Navigate to results page
          window.location.href = '/resultater';
        }
      }
      
      // Reset animation state
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };
  
  // Set up swipe handlers correctly
  const { 
    handleTouchStart, 
    handleTouchMove, 
    handleTouchEnd, 
    handleMouseDown,
    handleMouseUp
  } = useSwipe({
    onSwipeLeft: () => handleResponse(false),
    onSwipeRight: () => handleResponse(true)
  });
  
  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? ((currentQuestionIndex) / questions.length) * 100 
    : 0;
  
  if (!currentQuestion) {
    return <div className="amnesty-container">Loading...</div>;
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
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="question-container">
          <div 
            className={`question-card ${isAnimating ? `animate-${animationDirection}` : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="question-content">
              <p className="question-text">{currentQuestion.text}</p>
              
              {currentQuestion.imageUrl && (
                <div className="question-image">
                  <img src={currentQuestion.imageUrl} alt="Spørsmålsillustrasjon" />
                </div>
              )}
              
              {currentQuestion.videoUrl && (
                <div className="question-video">
                  <video controls>
                    <source src={currentQuestion.videoUrl} type="video/mp4" />
                    Din nettleser støtter ikke videoavspilling.
                  </video>
                </div>
              )}
            </div>
            
            <div className="swipe-instructions">
              <div className="swipe-left">
                <span>Uenig</span>
                <span className="arrow">←</span>
              </div>
              <div className="swipe-right">
                <span className="arrow">→</span>
                <span>Enig</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="nav-buttons">
          <button 
            className="nav-button" 
            onClick={() => handleResponse(false)}
            disabled={isAnimating}
          >
            Uenig
          </button>
          <button 
            className="nav-button nav-button-primary" 
            onClick={() => handleResponse(true)}
            disabled={isAnimating}
          >
            Enig
          </button>
        </div>
      </main>
      
      <footer className="amnesty-footer">
        <p>© {new Date().getFullYear()} Amnesty International Norge</p>
      </footer>
    </div>
  );
}
