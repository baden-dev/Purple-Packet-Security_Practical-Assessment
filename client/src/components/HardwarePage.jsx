import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';

function HardwareTable(){
    const [hardware, setHardwares] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);


    useEffect(() => {
        const fetchHardwares = async () => {
        try {
            const response = await apis.getAllHardware();
            setHardwares(response.data); 
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
        };

        fetchHardwares();
    }, []);

    const handleExpand = (itemId) => {
        if (expandedItem === itemId) {
        setExpandedItem(null);
        } else {
        setExpandedItem(itemId);
        }
    };


    return (
        <div className="table-container">
          <table className="table-tag">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>CPU Name</th>
                <th>Cores</th>
                <th>Time Scanned</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hardware.map((item) => (
                <React.Fragment key={item._id}>
                <tr>
                  <td>{item.agent_id}</td>
                  <td>{item.cpu.name}</td>
                  <td>{item.cpu.cores}</td>
                  <td>{formatTime(item.scan.time)}</td>
                  <td>
                    <button onClick={() => handleExpand(item._id)}>
                      {expandedItem === item._id ? '-' : '+'}
                    </button>
                  </td>
                </tr>
                {expandedItem === item._id && (
                  <tr>
                    <td colSpan="5">
                      <pre>{JSON.stringify(item, null, 2)}</pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      );

}

function formatTime(time) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
  
    const formattedTime = new Date(time).toLocaleString('en-US', options);
    return formattedTime;
}

export default HardwareTable;