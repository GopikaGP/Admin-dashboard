import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../services/severUrl';

function GrievanceDetail() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);

  useEffect(() => {
    fetchGrievanceDetail();
  }, []);

  const fetchGrievanceDetail = async () => {
    try {
      const response = await axios.get(`${serverUrl}/grievances/${id}`);
      setGrievance(response.data);
    } catch (error) {
      console.error('Error fetching grievance detail:', error);
    }
  };

  if (!grievance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Grievance Detail</h2>
      <p><strong>Name:</strong> {grievance.name}</p>
      <p><strong>Email:</strong> {grievance.email}</p>
      <p><strong>Description:</strong> {grievance.description}</p>
      <p><strong>Status:</strong> {grievance.status}</p>
      <Link to={`/dashboard/complaints/${id}/reply`} className="btn btn-primary">Reply</Link>
    </div>
  );
}

export default GrievanceDetail;
