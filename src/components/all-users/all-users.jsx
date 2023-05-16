import React, { useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from "@mui/material";
import "./all-users.scss";

const AllUsers = ({ allUsersInfo, showId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParam, setFilterParam] = useState('');

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleFilterChange = ({ target }) => {
    setFilterParam(target.value);
  };

  const filteredUsers = allUsersInfo.filter(user => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (user.displayName.toLowerCase().includes(lowerCaseSearchTerm) 
           || user.cardNumber.toString().includes(lowerCaseSearchTerm))
           && (filterParam === '' || user[filterParam]);
  });

  const convertTimestampToDate = useMemo(() => (timestamp) => {
    if (!timestamp || !timestamp.seconds || !timestamp.nanoseconds) {
      return "";
    }
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  }, []);

  const columns = [
    { field: 'userImg', headerName: 'User', width: 80, renderCell: (params) => (<img style={{ height: "50px" }} src={params.value} alt="userImg" />) },
    { field: 'displayName', headerName: 'Name', width: 200 },
    { field: 'cardNumber', headerName: 'Card Number', width: 180 },
    { field: 'createdAt', headerName: 'Created At', width: 150, valueGetter: (params) => convertTimestampToDate(params.value) },
    { field: 'balance', headerName: 'Balance', width: 150 },
    
    // { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => (<button onClick={() => showId(params.row.cardNumber)}>Show Id</button>) },
  ];

  

  return (
    <div className="all-users">
      <h2>All Users</h2>
      <div className="all-users__wrapper">
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange}/>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            rows={filteredUsers.map((user, index) => ({ ...user, id: index, action: ''}))} 
            columns={columns} 
            pagination
            autoPageSize
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableColumnMenu={true}
            disableSelectionOnClick={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

















// const AllUsers = ({ allUsersInfo, showId }) => {
//   return (
//     <div className="main__all-users">
//       <div>
//         <h1>All Users</h1>
//         {allUsersInfo
//           ? allUsersInfo.map((user, index) => (
//               <div key={index}>
//                 {user.displayName}
//                 <br />
//                 {user.cardNumber}
//                 <br />
//                 {user.balance}
//                 <br />
//                 <img style={{ height: "100px" }} src={user.userImg} alt="userImg" />
//                 <button onClick={() => showId(user.cardNumber)}>Show Id</button>
//               </div>
//             ))
//           : null}
//       </div>
//     </div>
//   );
// };

// export default AllUsers;