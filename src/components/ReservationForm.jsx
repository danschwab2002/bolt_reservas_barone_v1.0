import React, { useState, useEffect } from 'react';

    function ReservationForm({ addReservation, tables, editingReservation }) {
      const [name, setName] = useState('');
      const [date, setDate] = useState('');
      const [time, setTime] = useState('');
      const [tableId, setTableId] = useState('');
      const [isEvent, setIsEvent] = useState(false);

      useEffect(() => {
        if (editingReservation) {
          setName(editingReservation.name);
          setDate(editingReservation.date);
          setTime(editingReservation.time);
          setTableId(editingReservation.table_id);
          setIsEvent(editingReservation.is_event);
        }
      }, [editingReservation]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const newReservation = {
          table_id: tableId,
          name,
          date,
          time,
          is_event: isEvent
        };
        addReservation(editingReservation ? editingReservation.id : null, newReservation);
        setName('');
        setDate('');
        setTime('');
        setTableId('');
        setIsEvent(false);
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={editingReservation ? editingReservation.name : "Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder={editingReservation ? editingReservation.date : ""}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            placeholder={editingReservation ? editingReservation.time : ""}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <select
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          >
            <option value="">Select Table</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                Table {table.id} (Capacity: {table.capacity})
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              checked={isEvent}
              onChange={(e) => setIsEvent(e.target.checked)}
            />
            Is Event
          </label>
          <button type="submit">{editingReservation ? "Update Reservation" : "Add Reservation"}</button>
        </form>
      );
    }

    export default ReservationForm;
