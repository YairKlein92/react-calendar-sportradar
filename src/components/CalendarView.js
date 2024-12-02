import './CalendarView.css';
import {
  eachDayOfInterval,
  endOfMonth,
  getDate,
  getYear,
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

    if (storedEvents.length > 0) {
      const updatedEvents = [...data, ...storedEvents];
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
              const isCurrentMonth =
                day.getMonth() === 10 && getYear(day) === 2024;
              const event =
                // Ignore October and 2025
                isCurrentMonth &&
                events.find(
                  (event) =>
                    new Date(event.dateVenue).getDate() === getDate(day) &&
                    new Date(event.dateVenue).getMonth() === 10 &&
                    // getYear is not working here
                    // other option would be:
                    // getDate(new Date(event.dateVenue)) === getDate(day) &&
                    // getMonth(new Date(event.dateVenue)) === 10 &&
                    // getYear(new Date(event.dateVenue)) === 2024,
                    new Date(event.dateVenue).getFullYear() === 2024,
                );

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day-box ${isCurrentMonth ? '' : 'prev-month'} ${
                    event ? 'event-box' : 'no-event-box'
                  }`}
                >
                  {isCurrentMonth && event ? (
                    <Link
                      to={`/events/${event.dateVenue}`}
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
