'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function useUserTracking() {
  const pathname = usePathname();
  const [trackingUpdate, setTrackingUpdate] = useState(Date.now()); // Update trigger

  useEffect(() => {
    const today = getCurrentDate();
    const existingData = JSON.parse(localStorage.getItem('analyticsData') || '{}');

    // Ensure today's date entry is initialized as an array
    if (!Array.isArray(existingData[today])) {
      existingData[today] = [];
    }

    let pageStartTime = Date.now();

    // Start a new page visit
    const startPageVisit = () => {
      pageStartTime = Date.now();
    };

    // End the page visit, record duration, and trigger update
    const endPageVisit = () => {
      const duration = Math.floor((Date.now() - pageStartTime) / 1000);

      // Append or update today's page visit data
      const todayData = existingData[today];
      const existingPageVisit = todayData.find((visit) => visit.url === pathname);

      if (existingPageVisit) {
        existingPageVisit.duration += duration;
      } else {
        todayData.push({ url: pathname, duration });
      }

      localStorage.setItem('analyticsData', JSON.stringify(existingData));
      setTrackingUpdate(Date.now()); // Trigger update
    };

    // Initialize tracking for the page visit
    startPageVisit();

    // Ensure the page visit is recorded on navigation or page unload
    window.addEventListener('beforeunload', endPageVisit);

    return () => {
      endPageVisit();
      startPageVisit();
    };
  }, [pathname]);

  return trackingUpdate; // Return the update trigger
}

export default useUserTracking;
