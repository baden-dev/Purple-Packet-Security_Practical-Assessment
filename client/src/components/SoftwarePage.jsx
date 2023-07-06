import React, { useEffect, useState } from 'react';
import apis from '../api/index';
import '../css/Tables.css';
import '../css/SearchBar.css';

function SoftwareTable() {
  const [software, setSoftwares] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSoftware, setFilteredSoftware] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [softwarePerPage] = useState(20);

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

  useEffect(() => {
    const filtered = software.filter(item => {
      const agentId = item.agent_id ? item.agent_id.toLowerCase() : '';
      const section = item.section ? item.section.toLowerCase() : '';
      const name = item.name ? item.name.toLowerCase() : '';
      return (
        agentId.includes(searchInput.toLowerCase()) || section.includes(searchInput.toLowerCase()) || name.includes(searchInput.toLowerCase())
      );
    });

    setFilteredSoftware(filtered);
    setCurrentPage(1); // Reset to first page when search input changes
  }, [searchInput, software]);

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

  const indexOfLastSoftware = currentPage * softwarePerPage;
  const indexOfFirstSoftware = indexOfLastSoftware - softwarePerPage;
  const currentSoftware = filteredSoftware.slice(indexOfFirstSoftware, indexOfLastSoftware);

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="table-container">
      <div className="search-container">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Agent ID, Section, or Name"
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
            <th>Section</th>
            <th>Name</th>
            <th>Description</th>
            <th>Size</th>
            <th>Format</th>
            <th>Expand</th>
          </tr>
        </thead>
        <tbody>
          {currentSoftware.map((item) => (
            <React.Fragment key={item._id}>
              <tr>
                <td>{item.agent_id}</td>
                <td>{item.section}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.size}</td>
                <td>{item.format}</td>
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

      {/* Pagination */}
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
        <button disabled={currentSoftware.length < softwarePerPage} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default SoftwareTable;