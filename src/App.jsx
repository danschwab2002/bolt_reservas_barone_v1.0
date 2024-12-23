import React, { useState, useEffect } from 'react';
    import ReservationForm from './components/ReservationForm';
    import ReservationTable from './components/ReservationTable';
    import TableList from './components/TableList';
    import ZoneList from './components/ZoneList';
    import { supabase } from './supabaseClient';

    function App() {
      const [reservations, setReservations] = useState([]);
      const [tables, setTables] = useState([]);
      const [zones, setZones] = useState([]);

      useEffect(() => {
        fetchTables();
        fetchReservations();
        fetchZones();
      }, []);

      const fetchTables = async () => {
        const { data, error } = await supabase.from('tables').select(`
          *,
          zones (name)
        `);
        if (error) console.error('Error fetching tables:', error);
        else setTables(data);
      };

      const fetchReservations = async () => {
        const { data, error } = await supabase
          .from('reservations')
          .select(`
            *,
            tables (
              *,
              zones (name)
            )
          `);
        if (error) console.error('Error fetching reservations:', error);
        else setReservations(data);
      };

      const fetchZones = async () => {
        const { data, error } = await supabase.from('zones').select();
        if (error) console.error('Error fetching zones:', error);
        else setZones(data);
      };

      const addReservation = async (reservation) => {
        const { data } = await supabase.from('reservations').insert([reservation]);
        setReservations([...reservations, ...data]);
      };

      const updateReservation = async (id, updatedData) => {
        const { data, error } = await supabase.from('reservations').update(updatedData).eq('id', id);
        if (error) console.error('Error updating reservation:', error);
        else setReservations(reservations.map(reservation => (reservation.id === id ? data[0] : reservation)));
        setEditingReservation(null);
      };

      const removeReservation = async (id) => {
        await supabase.from('reservations').delete().eq('id', id);
        setReservations(reservations.filter(reservation => reservation.id !== id));
      };

      const deleteTable = async (id) => {
        const { error } = await supabase.from('tables').delete().eq('id', id);
        if (error) console.error('Error deleting table:', error);
        else setTables(tables.filter(table => table.id !== id));
      };

      return (
        <div className="container">
          <h1>Restaurant Reservations</h1>
          <ReservationForm addReservation={addReservation} tables={tables} />
          <ReservationTable
            reservations={reservations}
            removeReservation={removeReservation}
            setEditingReservation={setEditingReservation}
          />
          <TableList tables={tables} deleteTable={deleteTable} />
          <ZoneList zones={zones} />
        </div>
      );
    }

    export default App;
