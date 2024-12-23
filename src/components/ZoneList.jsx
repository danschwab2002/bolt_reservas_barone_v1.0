import React from 'react';

    function ZoneList({ zones }) {
      return (
        <div>
          <h2>Zones</h2>
          <table>
            <thead>
              <tr>
                <th>Zone ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id}>
                  <td>{zone.id}</td>
                  <td>{zone.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default ZoneList;
