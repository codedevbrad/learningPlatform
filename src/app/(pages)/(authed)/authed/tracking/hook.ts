'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function useUserTracking() {
  const pathname = usePathname();
  const [trackingUpdate, setTrackingUpdate] = useState(Date.now());
  const [existingData, setExistingData] = useState(() => {
    return JSON.parse(localStorage.getItem('analyticsData') || '{}');
  });

  // Function to delete analytics data locally
  const deleteAnalytics = () => {
    localStorage.removeItem('analyticsData');
    setExistingData({});
    setTrackingUpdate(Date.now()); // Trigger update to reflect deletion
  };

  // Function to upload analytics data to the database
  const uploadAnalyticsData = async () => {
    const dataToUpload = JSON.parse(localStorage.getItem('analyticsData') || '{}');
    if (Object.keys(dataToUpload).length > 0) {
      try {
        // Replace with actual API call to your database
        console.log('Analytics data uploaded successfully');
      } 
      catch (error) {
        console.error('Error uploading analytics data:', error);
      }
    }
  };

  useEffect(() => {
    const today = getCurrentDate();
    const data = { ...existingData };

    if (!Array.isArray(data[today])) {
      data[today] = [];
    }

    let pageStartTime = Date.now();
    let hasEnded = false;

    // Track page visit immediately upon entering the page
    const todayData = data[today];
    const existingPageVisit = todayData.find((visit) => visit.url === pathname);

    if (!existingPageVisit) {
      todayData.push({ url: pathname, duration: 0 }); // Initial duration is 0
      setExistingData(data);
      localStorage.setItem('analyticsData', JSON.stringify(data));
      setTrackingUpdate(Date.now()); // Trigger update to reflect new page visit
      uploadAnalyticsData(); // Upload data after tracking a new page visit
    }

    const endPageVisit = () => {
      if (hasEnded) return;

      const duration = Math.floor((Date.now() - pageStartTime) / 1000);
      if (existingPageVisit) {
        existingPageVisit.duration += duration;
      } else {
        const newPageVisit = todayData.find((visit) => visit.url === pathname);
        if (newPageVisit) {
          newPageVisit.duration += duration;
        }
      }

      localStorage.setItem('analyticsData', JSON.stringify(data));
      setExistingData(data);
      hasEnded = true;
      uploadAnalyticsData(); // Upload data before ending the page visit
    };

    // Reset timing for new page
    pageStartTime = Date.now();
    hasEnded = false;

    window.addEventListener('beforeunload', endPageVisit);

    return () => {
      endPageVisit();
      window.removeEventListener('beforeunload', endPageVisit);
    };
  }, [pathname]);

  return { trackingUpdate, existingData, deleteAnalytics, uploadAnalyticsData };
}

export default useUserTracking;
