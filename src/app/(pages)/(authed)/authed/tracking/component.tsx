'use client';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import useUserTracking from './hook';
import Title from '@/app/reusables/content/title';

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

function AnalyticItem({ url, isCurrent, timeOnPage, duration }) {
  return (
    <div className={`mb-1 text-sm p-4 ${isCurrent ? 'bg-gray-800 font-bold rounded-xl' : ''}`}>
      <p>Page: <span className="font-medium">{url}</span></p>
      <p>Time Spent: <span className="font-medium">{formatDuration(duration)}</span></p>
      {isCurrent && <p> current: {formatDuration(timeOnPage)} </p>}
    </div>
  );
}

function AnalyticsPopover() {
  const { trackingUpdate, existingData, deleteAnalytics } = useUserTracking(); // Include trackingUpdate to trigger updates
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [display, setDisplay] = useState(true);
  const currentPage = window.location.pathname;

  useEffect(() => {
    setTimeOnPage(0); // Reset time on page whenever tracking data updates
  }, [trackingUpdate]); // Trigger re-fetch on tracking updates

  useEffect(() => {
    console.log('test')
    setTimeOnPage(0)
    const intervalId = setInterval(() => {
      setTimeOnPage((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ currentPage  ]);

  const today = new Date().toISOString().split('T')[0];
  const todayData = existingData[today] || [];

  return (
    <Popover open={display} onOpenChange={setDisplay}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="z-50 fixed bottom-6 left-8 bg-red-400 text-white flex flex-row space-x-2"
        >
          <div> {formatDuration(timeOnPage)} </div>
          <div className='w-4 h-4 rounded-full bg-white text-white animate-pulse'> </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-6 bg-black text-white w-auto mb-3 shadow-2xl rounded-2xl"
        onInteractOutside={(e) => e.preventDefault()}
        align="start"
      >
        <Title title="Today's Page Visits" variant="subheading1" />
        {todayData.length > 0 ? (
          todayData.map((visit, index) => (
            <AnalyticItem
              isCurrent={visit.url === currentPage}
              key={index}
              timeOnPage={timeOnPage}
              duration={visit.duration}
              url={visit.url}
            />
          ))
        ) : (
          <p>No page visits recorded for today.</p>
        )}
        <Button
          variant="secondary"
          onClick={deleteAnalytics}
          className="mt-4 w-full bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl"
        >
          Clear Tracking Data
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default AnalyticsPopover;
