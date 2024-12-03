'use client'
import Title from "@/app/reusables/content/title"

import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enGB from 'date-fns/locale/en-GB'
import { useState, useRef } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup localizer using date-fns.
const locales = {
  'en-GB': enGB, // Use British English locale
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Events
const events = [
  {
    title: 'Meeting with Team',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    allDay: false,
  },
  {
    title: 'Meeting with tea 3',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    allDay: false,
  },
  {
    title: 'Meeting with other team 1',
    start: new Date(new Date().setHours(new Date().getHours() + 2)),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    allDay: false,
  },
  {
    title: 'Meeting with other team 2',
    start: new Date(new Date().setHours(new Date().getHours() + 5)),
    end: new Date(new Date().setHours(new Date().getHours() + 7)),
    allDay: false,
  },
];

// Custom Toolbar Component
const CustomToolbar = ({ date, onNavigate, onView, view }) => {
  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button onClick={() => onNavigate('TODAY')}>Today</button>
        <button onClick={() => onNavigate('PREV')}>Back</button>
        <button onClick={() => onNavigate('NEXT')}>Next</button>
      </div>
      <span className="rbc-toolbar-label">{format(date, 'MMMM yyyy')}</span>
      <div className="rbc-btn-group">
        <button onClick={() => onView(Views.MONTH)} disabled={view === Views.MONTH}>
          Month
        </button>
        <button onClick={() => onView(Views.WEEK)} disabled={view === Views.WEEK}>
          Week
        </button>
        <button onClick={() => onView(Views.DAY)} disabled={view === Views.DAY}>
          Day
        </button>
      </div>
    </div>
  );
};

export default function Calendar({ availability }) {
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (action) => {
    let newDate;

    switch (action) {
      case 'TODAY':
        newDate = new Date();
        break;
      case 'PREV':
        newDate = navigateDate(currentDate, view, -1);
        break;
      case 'NEXT':
        newDate = navigateDate(currentDate, view, 1);
        break;
      default:
        newDate = currentDate;
    }

    setCurrentDate(newDate);
  };

  // Helper function to calculate new date based on navigation action and view
  const navigateDate = (date, view, direction) => {
    const increment = direction > 0 ? 1 : -1;
    switch (view) {
      case Views.MONTH:
        return new Date(date.setMonth(date.getMonth() + increment));
      case Views.WEEK:
        return new Date(date.setDate(date.getDate() + 7 * increment));
      case Views.DAY:
        return new Date(date.setDate(date.getDate() + increment));
      default:
        return date;
    }
  };

  // Custom day style handler
  const dayPropGetter = (date) => {
    const dayName = format(date, 'EEEE'); // Get day name, e.g., "Monday"
    const isUnavailable = !availability.includes(dayName); // Grayed out if not available

    if (isUnavailable) {
      return {
        style: {
          backgroundColor: '#f0f0f0',
          color: '#999',
          pointerEvents: 'none', // Disable click events
        },
      };
    }
    return {};
  };

  return (
    <div ref={calendarRef} className="space-y-4">
      <Title title="Tutor Calendar" variant="heading" noMargin={true} />
      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={handleNavigate}
        selectable
        onSelectSlot={(slotInfo) => console.log(slotInfo)}
        onSelectEvent={(event) => alert(event.title)}
        view={view}
        onView={handleViewChange}
        views={['month', 'week', 'day']}
        components={{
          toolbar: (props) => <CustomToolbar {...props} onNavigate={handleNavigate} />,
        }}
        style={{ height: '600px' }}
        dayPropGetter={dayPropGetter} // Apply custom styles to days
      />
    </div>
  );
}
