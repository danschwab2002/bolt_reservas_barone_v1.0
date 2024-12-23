import React from 'react';

    function ReservationTable({ reservations, removeReservation, setEditingReservation }) {
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table ID</th>
              <th>Zone</th>
              <th>Is Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.table_id}</td>
                <td>{reservation.tables.zones.name}</td>
                <td>{reservation.is_event ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => setEditingReservation(reservation)}>Edit</button>
                  <button onClick={() => removeReservation(reservation.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    export default ReservationTable;
