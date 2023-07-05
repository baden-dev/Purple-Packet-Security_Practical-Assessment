import React, { useEffect, useState } from 'react';
import apis from '../../api/index';
import '../../css/AgentsPageCss/AgentsDetails.css';

const AgentDetails = () => {
    const [agents, setAgents] = useState([]);
    const [activeCount, setActiveCount] = useState(0);
    const [disconnectedCount, setDisconnectedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [neverConnectedCount, setNeverConnectedCount] = useState(0);

    useEffect(() => {
        const fetchAgents = async () => {
        try {
            const response = await apis.getAllAgents();
            setAgents(response.data); 
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
        };

        fetchAgents();
    }, []);
   
    //-------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // Count the occurrences of different statuses
        let active = 0;
        let disconnected = 0;
        let pending = 0;
        let neverConnected = 0;
    
        agents.forEach(agent => {
          switch (agent.status) {
            case 'active':
              active++;
              break;
            case 'disconnected':
              disconnected++;
              break;
            case 'pending':
              pending++;
              break;
            case 'never_connected':
              neverConnected++;
              break;
            default:
              break;
          }
        });
    
        setActiveCount(active);
        setDisconnectedCount(disconnected);
        setPendingCount(pending);
        setNeverConnectedCount(neverConnected);
      }, [agents]);

    //-------------------------------------------------------------------------------------

    return (
      <div className="container">
        <div className="sub-container">
          <table className="table">
            <tbody>
              <tr>
                <td className="item">
                  <p>Active</p>
                  <p style={{ color: 'blue' }}>{activeCount}</p>
                </td>
                <td className="item">
                  <p>Disconnected</p>
                  <p style={{ color: 'red' }}>{disconnectedCount}</p>
                </td>
                <td className="item">
                  <p>Pending</p>
                  <p style={{ color: 'yellow' }}>{pendingCount}</p>
                </td>
                <td className="item">
                  <p>Never Connected</p>
                  <p style={{ color: 'darkgrey' }}>{neverConnectedCount}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AgentDetails;