import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';

function VulnerabilitiesTable(){
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const fetchVulnerabilities = async () => {
        try {
            const response = await apis.getAllVulnerabilities();
            setVulnerabilities(response.data); 
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
        };

        fetchVulnerabilities();
    }, []);

    const handleExpand = (itemId) => {
        if (expandedItem === itemId) {
          setExpandedItem(null);
        } else {
          setExpandedItem(itemId);
        }
      };
    
      const formatTime = (time) => {
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
      };
    
      return (
        <div className="table-container">
          <table className="table-tag">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Severity</th>
                <th>Title</th>
                <th>Detection Time</th>
                <th>Expand</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((item) => (
                <React.Fragment key={item._id}>
                  <tr>
                    <td>{item.agent_id}</td>
                    <td>{item.severity}</td>
                    <td>{item.title}</td>
                    <td>{formatTime(item.detection_time)}</td>
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
    
    export default VulnerabilitiesTable;