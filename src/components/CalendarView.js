import './CalendarView.css';
import {
  eachDayOfInterval,
  endOfMonth,
  getDate,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sportData from '../sportData.json';

const data = sportData.data;

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    console.log('Fetched events from localStorage:', storedEvents);

    if (storedEvents.length > 0) {
      const firstEventDate = storedEvents[0].dateVenue;
      console.log('First event date:', firstEventDate);

      const eventsWithFirstEventDate = data.map((event) => ({
        ...event,
        firstEventDate, // Add firstEventDate property to each event
      }));

      console.log(
        'Updated events with firstEventDate:',
        eventsWithFirstEventDate,
      );

      const updatedEvents = [...eventsWithFirstEventDate, ...storedEvents];

      console.log('Updated events array:', updatedEvents);

      setEvents(updatedEvents);
    } else {
      setEvents(data);
    }
  }, []);

  const startOfMonthDate = startOfMonth(new Date(2024, 10)); // November 2024
  const startDay = startOfWeek(startOfMonthDate, { weekStartsOn: 0 });

  const daysInThisMonth = eachDayOfInterval({
    start: startDay,
    end: endOfMonth(new Date(2024, 10)),
  });

  const getCalendarGrid = (days) => {
    const weeks = [];
    let currentWeek = [];

    days.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === days.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  };

  const weeks = getCalendarGrid(daysInThisMonth);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">November</h1>

      <div className="calendar-grid">
        <div className="weekday-labels">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="days-grid">
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const event = events.find(
                (event) => new Date(event.dateVenue).getDate() === getDate(day),
              );

              // Check if the day is part of the previous month
              const isPrevMonth = getDate(day) > 31;

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day-box ${event ? 'event-box' : 'no-event-box'} ${
                    isPrevMonth ? 'prev-month' : ''
                  }`}
                >
                  {event ? (
                    <Link
                      to={`/event/${event.dateVenue}-${event.awayTeam?.slug}`}
                      className="event-link"
                    >
                      {getDate(day)}
                    </Link>
                  ) : (
                    getDate(day)
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
