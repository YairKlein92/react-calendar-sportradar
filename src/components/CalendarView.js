import React from 'react';
import { Link } from 'react-router-dom';
import sportData from '../sportData.json';

const CalendarView = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Upcoming Events</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Match</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {sportData.data.map((event, index) => (
              <tr key={index}>
                <td>{event.dateVenue}</td>
                <td>
                  {event.homeTeam?.name || 'TBD'} vs{' '}
                  {event.awayTeam?.name || 'TBD'}
                </td>
                <td>
                  <Link
                    to={`/event/${event.originCompetitionId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarView;
