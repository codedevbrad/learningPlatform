'use client'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'

const CookiesConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookiesConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesConsent', 'accepted');
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="px-4 py-6 fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-lg max-w-md w-full">
          <div className="text-center space-y-4">
            <p className="text-gray-800 text-sm">
              This website uses cookies to ensure you get the best experience on our website.
            </p>
            <Button onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesConsent;