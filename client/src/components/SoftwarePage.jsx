import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';

function SoftwareTable(){
    const [software, setSoftwares] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);


    useEffect(() => {
        const fetchSoftwares = async () => {
        try {
            const response = await apis.getAllSoftware();
            setSoftwares(response.data); 
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
        };

        fetchSoftwares();
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
                <th>Section</th>
                <th>Name</th>
                <th>Description</th>
                <th>Size</th>
                <th>Expand</th>
              </tr>
            </thead>
            <tbody>
              {software.map((item) => (
                <React.Fragment key={item._id}>
                  <tr>
                    <td>{item.agent_id}</td>
                    <td>{item.section}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.size}</td>
                    <td>
                      <button onClick={() => handleExpand(item._id)}>
                        {expandedItem === item._id ? '-' : '+'}
                      </button>
                    </td>
                  </tr>
                  {expandedItem === item._id && (
                    <tr>
                      <td colSpan="6">
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
    
    export default SoftwareTable;