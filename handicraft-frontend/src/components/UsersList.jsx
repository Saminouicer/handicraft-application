import React from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UsersList(props) {
  const Auth = useAuth();
  const [users, setUsers] = useState([]);
  const [search,setSearch]= useState("");

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/users`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    setUsers(result.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8080/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${Auth.jwt}`,
      },
    });
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);



  return (
    <div>
      <form className="flex justify-center p-2">
        <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="search" className="searchInput w-[400px]  " />
      </form>
      <div className="p-2 mx-2 mb-1 text-center bg-[#F88D2F] text-white rounded-xl">
        {props.role==="client"?("List Of Clients"):("List Of Craftsmen")}
      </div>
      <div>
        <table className="min-w-full divide-y divide-gray-200 shadow-lg  overflow-hidden">
          <thead className="bg-[#F88D2F] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                UserName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.filter((user)=> {
                return user.role === props.role && search===""?user:
                user.role === props.role&&user.userName.toLowerCase().includes(search.toLowerCase())
            }).map((user, index) => {
              // if (user.role === props.role) {
                return (
                  <tr id={index} key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap ">
                      <button
                        onClick={() => deleteUser(user.userId)}
                        className="bg-red-600 rounded-2xl text-white px-2 py-2 mx-2 text-sm"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/EditeUser/${user.userId}`}
                        className="bg-blue-600 rounded-2xl text-white px-2 py-1 mx-2 text-sm"
                      >
                        Update
                      </Link>
                      {/* <Link to={`/users/${user.userId}`} className='bg-green-600 rounded-2xl text-white px-2 py-1 mx-2 text-sm'>details</Link> */}
                    </td>
                  </tr>
                );
              // }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
