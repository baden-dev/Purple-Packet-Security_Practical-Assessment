import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';
import '../css/SearchBar.css';

function VulnerabilitiesTable() {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vulnerabilitiesPerPage] = useState(20);

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

  useEffect(() => {
    const filtered = vulnerabilities.filter(item => {
      const agentId = item.agent_id ? item.agent_id.toLowerCase() : '';
      const severity = item.severity ? item.severity.toLowerCase() : '';
      const title = item.title ? item.title.toLowerCase() : '';
      return (
        agentId.includes(searchInput.toLowerCase()) ||
        severity.includes(searchInput.toLowerCase()) ||
        title.includes(searchInput.toLowerCase())
      );
    });

    setFilteredVulnerabilities(filtered);
    setCurrentPage(1);
  }, [searchInput, vulnerabilities]);

  const handleExpand = (itemId) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const indexOfLastVulnerability = currentPage * vulnerabilitiesPerPage;
  const indexOfFirstVulnerability = indexOfLastVulnerability - vulnerabilitiesPerPage;
  const currentVulnerabilities = filteredVulnerabilities.slice(
    indexOfFirstVulnerability,
    indexOfLastVulnerability
  );

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="table-container">
      <div className="search-container">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Agent ID, Severity, or Title"
          value={searchInput}
          onChange={handleSearchInputChange}
        />

        {/* Image */}
        <img src={process.env.PUBLIC_URL + '/images/search_grey.png'} alt="Icon" className="search-icon" />
      </div>

      {/* Table */}
      <table className="table-tag">
        <thead>
          <tr>
            <th>Agent ID</th>
            <th>Severity</th>
            <th>Cvss3 Score</th>
            <th>Title</th>
            <th>Detection Time</th>
            <th>Expand</th>
          </tr>
        </thead>
        <tbody>
          {currentVulnerabilities.map((item) => (
            <React.Fragment key={item._id}>
              <tr>
                <td>{item.agent_id}</td>
                <td>{item.severity}</td>
                <td>{item.cvss3_score}</td>
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

      {/* Pagination */}
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
        <button disabled={currentVulnerabilities.length < vulnerabilitiesPerPage} onClick={handleNextPage}>Next</button>
      </div>
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

export default VulnerabilitiesTable;