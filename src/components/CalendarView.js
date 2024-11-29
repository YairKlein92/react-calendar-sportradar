import { eachDayOfInterval, endOfMonth, getDate, startOfMonth } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import sportData from '../sportData.json';

const data = sportData.data;

const CalendarView = () => {
  const daysInThisMonth = eachDayOfInterval({
    start: startOfMonth(new Date(2024, 10, 3)),
    end: endOfMonth(new Date(2024, 10, 29)),
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">November</h1>
      <div className="row row-cols-7 g-3">
        {daysInThisMonth.map((day) => {
          // Find the event corresponding to the current day
          const event = data.find(
            (event) => new Date(event.dateVenue).getDate() === getDate(day),
          );

          return (
            <div key={day} className="col">
              <div
                className={`border rounded text-center p-3 ${
                  event ? 'bg-primary text-white' : 'bg-light'
                }`}
              >
                {/* If there's an event on this day, make it a Link */}
                {event ? (
                  <Link
                    to={`/event/${event.awayTeam?.slug}`}
                    className="text-white text-decoration-none"
                  >
                    {getDate(day)}
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
