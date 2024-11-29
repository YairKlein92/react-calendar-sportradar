import { eachDayOfInterval, endOfMonth, getDate, startOfMonth } from 'date-fns';
import React from 'react';
import sportData from '../sportData.json';

const CalendarView = () => {
  // Not the whole month:
  // const CalendarView = () => {
  //   const daysInThisMonth = eachDayOfInterval({
  //     start: new Date(2024, 10, 3), // November 3rd, 2024
  //     end: new Date(2024, 10, 28), // November 30th, 2024
  //   });

  // Get the number of days of the month
  // https://date-fns.org/
  // https://github.com/date-fns/date-fns/issues/1247
  const daysInThisMonth = eachDayOfInterval({
    start: startOfMonth(new Date(2024, 10, 3)), // 2024, 0 = January
    end: endOfMonth(new Date(2024, 10, 29)),
  });

  // if there is event
  const daysWithEvent = sportData.data.map((event) => {
    const eventDate = new Date(event.dateVenue); // -> Data object
    const eventDay = eventDate.getDate();
    return eventDay;
  });

  console.log('Days with events:', daysWithEvent); // Final array of event days

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">November</h1>
      <div className="row row-cols-7 g-3">
        {daysInThisMonth.map((day) => (
          <div key={day} className="col">
            <div
              className={`border rounded text-center p-3 ${
                daysWithEvent.includes(getDate(day))
                  ? 'bg-primary text-white'
                  : 'bg-light'
              }`}
            >
              {getDate(day)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
