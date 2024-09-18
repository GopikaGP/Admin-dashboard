import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { serverUrl } from '../services/severUrl';

function ReplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/grievances/${id}/resolution`, {
        resolution: response  // Use the response state value here
      });
      setSuccessMessage('Reply submitted successfully.');
      setErrorMessage('');
      setResponse(''); // Clear the response field after submission
      setTimeout(() => {
        navigate('/dashboard/complaints'); // Redirect to the complaints list after a short delay
      }, 2000); // Adjust the delay if needed
    } catch (error) {
      console.error('Error submitting reply:', error);
      setErrorMessage('Failed to submit reply. Please try again.');
      setSuccessMessage('');
    }
  };
  
  return (
    <div>
      <h2>Reply to Complaint</h2>
      <form onSubmit={handleReplySubmit}>
        <div className="mb-3">
          <label htmlFor="response" className="form-label">Your Reply</label>
          <textarea
            id="response"
            className="form-control"
            rows="5"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Reply</button>
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default ReplyForm;
