import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../services/severUrl';
import '../styles/dashboard.css';

function Complaints() {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // For status filtering
  const [statusOptions] = useState(['All', 'Pending', 'Approved', 'Rejected']); // Status options

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      // Update the URL here
      const response = await axios.get(`${serverUrl}/all`);
      console.log('Fetched grievances:', response.data); // Add this line
      if (Array.isArray(response.data)) {
        setGrievances(response.data);
        setFilteredGrievances(response.data); // Initially show all grievances
      } else {
        setGrievances([]);
        setFilteredGrievances([]);
      }
    } catch (error) {
      console.error('Error fetching grievances:', error);
    }
  };

  // Combine search and filter logic
  useEffect(() => {
    let filtered = grievances;

    // Filter by status if a status is selected
    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter(grievance => grievance.status === statusFilter);
    }

    // Search by name, email, or description
    if (searchTerm) {
      filtered = filtered.filter((grievance) => {
        const nameMatch = grievance.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const emailMatch = grievance.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = grievance.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || emailMatch || descriptionMatch;
      });
    }

    setFilteredGrievances(filtered);
  }, [searchTerm, statusFilter, grievances]); // Re-run filter when searchTerm, statusFilter, or grievances change

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${serverUrl}/grievances/${id}`, { status });
      fetchGrievances(); // Refresh the list
    } catch (error) {
      console.error('Error updating grievance status:', error);
    }
  };

  return (
    <div className="complaints-container">
      <div className="filters">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search complaints by username, email, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Status filter dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Complaints table */}
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrievances.length > 0 ? (
            filteredGrievances.map((grievance, index) => (
              <tr key={grievance._id}>
                <td>{index + 1}</td>
                <td>{grievance.name}</td>
                <td>{grievance.email}</td>
                <td>
                  {grievance.description.substring(0, 35)}
                  {grievance.description.length > 35 && (
                    <a
                      className="viewmore"
                      onClick={() => navigate(`/dashboard/complaints/${grievance._id}`)}
                    >
                      {' '}
                      View More...
                    </a>
                  )}
                </td>
                <td>{grievance.status}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(grievance._id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(grievance._id, 'Rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No grievances found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Complaints;
