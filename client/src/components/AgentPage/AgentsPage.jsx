import React from 'react';
import AgentDetails from './AgentsDetails';
import AgentsTable from './AgentsTable';

const AgentsPage = () => {
  return (
    <div>
      {/* Your other content */}
      <AgentDetails/>
      <AgentsTable/>
      {/* More content */}
    </div>
  );
};

export default AgentsPage;