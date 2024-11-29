import { getDate, getDay } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import sportData from '../sportData.json';

const data = sportData.data;

const EventsDetailsPage = () => {
  const daysOfTheWeek = [
    'Sun.',
    'Mon.',
    'Tue.',
    'Wed.',
    'Thu.',
    'Fri.',
    'Sat.',
  ];
  // function to cut the seconds off of dateVenue
  const formatTime = (time) => {
    return time.slice(0, 5); // Remove the seconds part
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Events in November</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date - daydatehour</th>
              <th scope="col">Match</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {sportData.data.map((event, index) => {
              // Convert event.dateVenue to a Date object
              const eventDate = new Date(event.dateVenue);
              const dayOfWeek = eventDate.getDay();
              const dayName = daysOfTheWeek[dayOfWeek];

              return (
                <tr key={index}>
                  <td>
                    {dayName}, {event.dateVenue} -{' '}
                    {formatTime(event.timeVenueUTC)}
                  </td>
                  <td>
                    {event.homeTeam?.name || 'TBD'} vs{' '}
                    {event.awayTeam?.name || 'TBD'}
                  </td>
                  <td>
                    <Link
                      to={`/event/${event.dateVenue}-${event.awayTeam?.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>{' '}
        </table>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
