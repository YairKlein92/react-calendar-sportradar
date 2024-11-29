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
  // Add Event
  const [events, setEvents] = useState(data);
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  // Add Event

  const startOfMonthDate = startOfMonth(new Date(2024, 10)); // November 2024
  const startDay = startOfWeek(startOfMonthDate, { weekStartsOn: 0 }); // Ensure the calendar starts with Sunday

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
        {/* Weekday labels */}
        <div className="weekday-labels">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="days-grid">
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const event = data.find(
                (event) => new Date(event.dateVenue).getDate() === getDate(day),
              );

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
