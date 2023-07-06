import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';
import '../css/SearchBar.css';

function HardwareTable() {
  const [hardware, setHardwares] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredHardware, setFilteredHardware] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hardwarePerPage] = useState(5);

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

  useEffect(() => {
    const filtered = hardware.filter(item => {
      const agentId = item.agent_id ? item.agent_id.toLowerCase() : '';
      const cpuName = item.cpu && item.cpu.name ? item.cpu.name.toLowerCase() : '';
      const cores = item.cpu && item.cpu.cores? item.cpu.cores.toLocaleString() : '';
      return agentId.includes(searchInput.toLowerCase()) || cpuName.includes(searchInput.toLowerCase()) || cores.includes(searchInput);
    });

    setFilteredHardware(filtered);
    setCurrentPage(1);
  }, [searchInput, hardware]);

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

  const indexOfLastHardware = currentPage * hardwarePerPage;
  const indexOfFirstHardware = indexOfLastHardware - hardwarePerPage;
  const currentHardware = filteredHardware.slice(indexOfFirstHardware, indexOfLastHardware);

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="table-container">
      <div className="search-container">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Agent ID, CPU Name or Cores"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <img src={process.env.PUBLIC_URL + '/images/search_grey.png'} alt="Icon" className="search-icon" />
      </div>

      {/* Table */}
      <table className="table-tag">
        <thead>
          <tr>
            <th>Agent ID</th>
            <th>CPU Name</th>
            <th>Cores</th>
            <th>Ram Free</th>
            <th>Ram Total</th>
            <th>Time Scanned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentHardware.map((item) => (
            <React.Fragment key={item.agent_id}>
              <tr>
                <td>{item.agent_id}</td>
                <td>{item.cpu.name}</td>
                <td>{item.cpu.cores}</td>
                <td>{item.ram.free}</td>
                <td>{item.ram.total}</td>
                <td>{formatTime(item.scan.time)}</td>
                <td>
                  <button onClick={() => handleExpand(item.agent_id)}>
                    {expandedItem === item.agent_id ? '-' : '+'}
                  </button>
                </td>
              </tr>
              {expandedItem === item.agent_id && (
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
        <button disabled={currentHardware.length <= hardwarePerPage} onClick={handleNextPage}>Next</button>
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

export default HardwareTable;