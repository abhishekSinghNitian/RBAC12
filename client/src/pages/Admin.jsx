// import React, { useEffect, useState } from "react";
// import { deleteUser, get, updateUserRole } from "../services/ApiEndpoint"; // Ensure addUser is imported
// import { toast } from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";
// export default function Admin() {
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const GetUsers = async () => {
//       try {
//         const request = await get("/api/admin/getuser");
//         const response = request.data;
//         setUsers(response.users);
//         if (request.status === 200) {
//           setUsers(response.users);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     GetUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       console.log("before req delete");
//       const request = await deleteUser(`/api/admin/delete/${id}`);
//       console.log("after req delete");
//       const response = request.data;
//       if (request.status === 200) {
//         toast.success(response.message);
//         setUsers((prev) => prev.filter((user) => user._id !== id));
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   const handleRoleChange = async (id, newRole) => {
//     try {
//       const request = await updateUserRole(
//         `/api/admin/update/${id}`,
//         { role: newRole },
//         { new: true }
//       );
//       console.log("after req");
//       const response = request.data;
//       console.log(response.role);
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === id ? { ...user, role: newRole } : user
//         )
//       );
//       if (request.status === 200) {
//         // Notify the user
//         toast.success(`${newRole} updated successfully!`);

//         // Update the state to reflect the change
//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user._id === id ? { ...user, role: newRole } : user
//           )
//         );
//       }
//     } catch (error) {
//       // Handle errors and notify the user
//       toast.error(
//         error.response?.data?.message ||
//           "Error updating role. Please try again."
//       );
//     }
//   };

//   const handlePermissionChange = async (id, newPermission) => {
//     try {
//       const request = await updateUserRole(
//         `/api/admin/update/${id}`,
//         { permissions: newPermission },
//         { new: true }
//       );
//       console.log("after req");
//       const response = request.data;
//       console.log(response.role);
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === id ? { ...user, permissions:newPermission} : user
//         )
//       );
//       if (request.status === 200) {
//         // Notify the user
//         toast.success(`${newPermission} updated successfully!`);

//         // Update the state to reflect the change
//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user._id === id ? { ...user, permissions:newPermission} : user
//           )
//         );
//       }
//     } catch (error) {
//       // Handle errors and notify the user
//       console.log('not found', error);
//     }
//   };
  
//   return (
//     <div className="admin-container">
//       <h2>Manage Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Permissions</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users &&
//             users.map((elem, index) => (
//               <tr key={index}>
//                 <td>{elem.name}</td>
//                 <td>{elem.email}</td>
//                 <td>
//                   <select
//                     value={elem.permissions}
//                     onChange={(e) => handlePermissionChange(elem._id, e.target.value)}
//                   >
//                     <option value="read">Read</option>
//                     <option value="write">Write</option>
//                     <option value="delete">Delete</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={elem.role} // Bind dropdown to the current role
//                     onChange={(e) => handleRoleChange(elem._id, e.target.value)} // Call handleRoleChange on change
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                     <option value="subadmin">Sub Admin</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button onClick={() => handleDelete(elem._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       <Link to="/register">
//         <button style={{width:200, margin:2}}>Add User</button>
//       </Link>
//       <Link to="/">
//         <button style={{width:200, margin:2}}>Admin Home</button>
//       </Link>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { deleteUser, get, updateUserRole } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux"; // For accessing logged-in user info

export default function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.Auth.user); // Logged-in user

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const request = await get("/api/admin/getuser");
        const response = request.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`);
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
        setUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const request = await updateUserRole(`/api/admin/update/${id}`, { role: newRole });
      const response = request.data;
      if (request.status === 200) {
        toast.success(`${newRole} updated successfully!`);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === id ? { ...user, role: newRole } : user))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating role. Please try again.");
    }
  };

  const handlePermissionChange = async (id, newPermission) => {
    try {
      const request = await updateUserRole(`/api/admin/update/${id}`, { permissions: newPermission });
      const response = request.data;
      if (request.status === 200) {
        toast.success(`${newPermission} updated successfully!`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, permissions: newPermission } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Permissions</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {!(loggedInUser._id === user._id && (user.role === "admin"|| user.role === "subadmin")) ? (
                    <select
                      value={user.permissions}
                      onChange={(e) => handlePermissionChange(user._id, e.target.value)}
                    >
                      <option value="read">Read</option>
                      <option value="write">Write</option>
                      <option value="delete">Delete</option>
                    </select>
                  ) : (
                    "Admin"
                  )}
                </td>
                <td>
                  {!(loggedInUser._id === user._id && (user.role === "admin" || user.role === "subadmin")) ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="subadmin">Sub Admin</option>
                    </select>
                  ) : (
                    "Admin"
                  )}
                </td>
                <td>
                  {loggedInUser._id !== user._id && (
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/register">
        <button style={{ width: 200, margin: 2 }}>Add User</button>
      </Link>
      <Link to="/">
        <button style={{ width: 200, margin: 2 }}>Admin Home</button>
      </Link>
    </div>
  );
}




