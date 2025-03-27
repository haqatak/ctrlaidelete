'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WelcomeScreen() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    // Add a small delay before navigation to allow animation to play
    setTimeout(() => {
      window.location.href = '/sporsmal';
    }, 300);
  };

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
        <div className="welcome-screen">
          <h1 className="welcome-title">Hvorfor skal JEG bry meg?</h1>
          
          <p className="welcome-description">
            Menneskerettigheter angår oss alle, men vi engasjerer oss av forskjellige grunner. 
            Denne interaktive opplevelsen vil hjelpe deg med å oppdage hvilke menneskerettighetsspørsmål 
            som samsvarer med dine personlige verdier.
          </p>
          
          <p className="welcome-description">
            Sveip til høyre hvis du er enig, eller til venstre hvis du er uenig med påstandene. 
            Basert på dine svar vil vi vise deg hvilke Amnesty-saker som passer best med dine verdier 
            og hvordan du kan bidra.
          </p>
          
          <button 
            className={`start-button ${isAnimating ? 'animate-pulse' : ''}`}
            onClick={handleStart}
          >
            Start opplevelsen
          </button>
        </div>
      </main>
      
      <footer className="amnesty-footer">
        <p>© {new Date().getFullYear()} Amnesty International Norge</p>
      </footer>
    </div>
  );
}
