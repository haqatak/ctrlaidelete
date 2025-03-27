// Social sharing component for Amnesty International Interactive Experience
'use client';

import { useState, useEffect } from 'react';

interface SocialSharingProps {
  personalityType: string;
  personalityDescription?: string;
  url?: string;
}

export default function SocialSharing({ 
  personalityType, 
  personalityDescription = '',
  url = '' 
}: SocialSharingProps) {
  const [shareUrl, setShareUrl] = useState(url);
  
  useEffect(() => {
    // Ensure we have the current URL - only run in browser
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Create share text based on personality type
  const getShareText = (platform: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    const baseText = `Jeg er ${personalityType} i Amnesty Internationals "Hvorfor skal JEG bry meg?" test.`;
    const callToAction = 'Finn ut hvilken menneskerettighetsforkjemper du er!';
    
    switch (platform) {
      case 'twitter':
        return encodeURIComponent(`${baseText} ${callToAction} #AmnestyNorge #MenneskeRettigheter`);
      case 'linkedin':
        return encodeURIComponent(`${baseText}\n\n${personalityDescription?.substring(0, 100)}...\n\n${callToAction}`);
      case 'email':
        return encodeURIComponent(`${baseText}\n\n${personalityDescription}\n\n${callToAction}`);
      case 'facebook':
      default:
        return encodeURIComponent(`${baseText} ${callToAction}`);
    }
  };

  // Generate share image URL (would be implemented on server in production)
  const getShareImageUrl = () => {
    // In a real implementation, this would generate a dynamic image with the user's results
    if (typeof window !== 'undefined') {
      return encodeURIComponent(`${window.location.origin}/images/share-card.jpg`);
    }
    return '';
  };

  // Share handlers
  const shareOnFacebook = () => {
    if (typeof window !== 'undefined') {
      const text = getShareText('facebook');
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${text}`, '_blank');
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== 'undefined') {
      const text = getShareText('twitter');
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const text = getShareText('linkedin');
      const title = encodeURIComponent(`Min menneskerettighetsprofil: ${personalityType}`);
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${title}&summary=${text}`, '_blank');
    }
  };

  const shareByEmail = () => {
    if (typeof window !== 'undefined') {
      const subject = encodeURIComponent(`Min menneskerettighetsprofil: ${personalityType}`);
      const body = getShareText('email');
      window.open(`mailto:?subject=${subject}&body=${body}%0A%0A${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = getShareText('facebook');
      window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  return (
    <div className="social-sharing">
      <h2 className="social-title">Del dine resultater</h2>
      
      <div className="social-buttons">
        <button onClick={shareOnFacebook} className="social-button" aria-label="Del på Facebook">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button onClick={shareOnTwitter} className="social-button" aria-label="Del på Twitter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button onClick={shareOnLinkedIn} className="social-button" aria-label="Del på LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 9H2V21H6V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button onClick={shareByEmail} className="social-button" aria-label="Del via e-post">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button onClick={shareOnWhatsApp} className="social-button" aria-label="Del på WhatsApp">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 15.5L13.5 12L17 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 8.5L10.5 12L7 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525L2 22L7.54751 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
