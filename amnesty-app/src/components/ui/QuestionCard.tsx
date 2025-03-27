import { useSwipe } from '@/hooks/swipe/useSwipe';
import { Question } from '@/lib/data/types';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (agree: boolean) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleAgree = () => {
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      onAnswer(true);
      setIsAnimating(false);
      setDirection(null);
    }, 300);
  };

  const handleDisagree = () => {
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      onAnswer(false);
      setIsAnimating(false);
      setDirection(null);
    }, 300);
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleDisagree,
    onSwipeRight: handleAgree,
  });

  return (
    <div
      className={`question-card ${isAnimating ? `animate-${direction}` : ''}`}
      {...swipeHandlers}
    >
      <div className="question-content">
        <p className="question-text">{question.text}</p>
        
        {question.imageUrl && (
          <div className="question-image">
            <img src={question.imageUrl} alt="Spørsmålsillustrasjon" />
          </div>
        )}
        
        {question.videoUrl && (
          <div className="question-video">
            <video controls>
              <source src={question.videoUrl} type="video/mp4" />
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
  );
}
