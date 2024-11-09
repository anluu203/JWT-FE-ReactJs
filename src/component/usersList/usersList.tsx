import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleFetchUsers } from "@/services/userService";

interface Position {
    name: string;
}

interface User {
    username: string;
    sex: string;
    phone: string;
    email: string;
    position?: Position;
}


export const UserList: React.FC = () => {
    const [listUsers, setListUsers] = useState<User[]>([]);
    const fetchUsers = async () =>{
        var response = await handleFetchUsers()
        if (response.data.EC === 0) {
            setListUsers(response.data.DT)
        }
    }
    useEffect(() => {
        fetchUsers()
    },[])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NO
            </th>
            <th scope="col" className="px-6 py-3">
              USER NAME
            </th>
            <th scope="col" className="px-6 py-3">
              SEX
            </th>
            <th scope="col" className="px-6 py-3">
              PHONE
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="px-6 py-3">
              POSITION
            </th>
          </tr>
        </thead>
        <tbody>
           {
            listUsers && listUsers.length > 0 ?
            <>
                {
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`row-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {index +1}
                            </th>
                            <td className="px-6 py-4">{item.username}</td>
                            <td className="px-6 py-4">{item.sex}</td>
                            <td className="px-6 py-4">{item.phone}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.position? item.position.name : ''}</td>
                            <td className="px-6 py-4">
                              <Link
                                to="#"
                                className="font-medium text-blue-600 hover:underline"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        )
                })}
            </> 
            : 
            <>
             <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800" role="alert">
                <span className="font-medium">List user is empty</span>
             </div>
            </>
           } 
        </tbody>
      </table>
    </div>
  );
};
