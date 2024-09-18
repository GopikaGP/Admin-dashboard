// import  { useEffect, useState } from 'react';
// import { getAllGrievancesApi } from '../server/allApi';
// import './dashboard.css';

// const GrievanceTable = () => {
//   const [grievances, setGrievances] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllGrievancesApi();
//         setGrievances(result);
//       } catch (error) {
//         console.error('Error fetching grievances:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="table-responsive">
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grievances.map((grievance) => (
//             <tr key={grievance._id}>
//               <td>{grievance._id}</td>
//               <td>{grievance.name}</td>
//               <td>{grievance.email}</td>
//               <td>{grievance.description}</td>
//               <td>{grievance.status}</td>
//               <td>
//                 <button className="btn btn-primary btn-sm">Resolve</button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GrievanceTable;
