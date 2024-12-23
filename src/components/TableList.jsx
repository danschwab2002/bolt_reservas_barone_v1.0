import React from 'react';

    function TableList({ tables, deleteTable }) {
      return (
        <div>
          <h2>Tables</h2>
          <table>
            <thead>
              <tr>
                <th>Table ID</th>
                <th>Capacity</th>
                <th>Zone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.id}>
                  <td>{table.id}</td>
                  <td>{table.capacity}</td>
                  <td>{table.zones.name}</td>
                  <td>
                    <button onClick={() => deleteTable(table.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default TableList;
