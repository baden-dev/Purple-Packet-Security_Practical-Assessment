import React, { useEffect, useState } from 'react';
import apis from '../../api/index';
import '../../css/Tables.css';

function AgentsTable() {
    const [agents, setAgents] = useState([])

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

    const getStatusColor = (status) => {
        switch (status) {
          case "active":
            return "green";
          case "disconnected":
            return "red";
          case "pending":
            return "yellow";
          case "never_connected":
            return "gray";
          default:
            return "black";
        }
      };

  return (
    <div className="table-container">
    <table className="table-tag">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>IP</th>
          <th>Cluster Node</th>
          <th>Version</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((agent) => (
          <tr key={agent._id}>
            <td>{agent.id}</td>
            {agent.os ? (
                <td>{`${agent.os.name} v${agent.os.major}.${agent.os.minor}`}</td>
              ) : (
                <td></td>
              )}
            <td>{agent.ip}</td>
            <td>{agent.node_name}</td>
            <td>{agent.version}</td>
            <td style={{ color: getStatusColor(agent.status) }}>{agent.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default AgentsTable;