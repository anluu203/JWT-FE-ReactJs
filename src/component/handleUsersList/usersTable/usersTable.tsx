// UserTable.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../usersList/usersList";
import ButtonBase from "../../atoms/button/button";
import { handleDeleteUser } from "@/services/userService";
import DialogDelete from "../dialogDelete";
interface UserTableProps {
  listUsers: User[];
  fetchUsers: () => Promise<void>;
}


const UserTable: React.FC<UserTableProps> = ({ listUsers, fetchUsers }) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User|null>(null)

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user)
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null)
  };


  const handleConfirmDelete  = async () =>{
    let response = await handleDeleteUser(selectedUser)
    if (response.data.EC === 0) {
      toast.success(response.data.EM)
      await fetchUsers()
    }else{
      toast.error(response.data.EM)
      await fetchUsers()
    }
    handleCloseDialog()
  }

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500  overflow-x-auto shadow-md sm:rounded-lg">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
        <tr>
          <th scope="col" className="px-6 py-3">NO</th>
          <th scope="col" className="px-6 py-3">USER NAME</th>
          <th scope="col" className="px-6 py-3">SEX</th>
          <th scope="col" className="px-6 py-3">PHONE</th>
          <th scope="col" className="px-6 py-3">EMAIL</th>
          <th scope="col" className="px-6 py-3">POSITION</th>
          <th scope="col" className="px-6 py-3">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 ? (
          listUsers.map((item, index) => (
            <tr key={`row-${index}`} className="bg-white border-b dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.username}</td>
              <td className="px-6 py-4">{item.sex}</td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.position ? item.position.name : ''}</td>
              <td className="px-6 py-4">
                <Link to="#" className="font-medium text-blue-600 hover:underline">Edit</Link>
                <ButtonBase
                    theme="cancel"
                    style={{marginLeft:'1rem'}}
                    onClick={() => handleOpenDialog(item)}
                >
                    Delete
                </ButtonBase>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="p-4 text-sm text-gray-800 rounded-lg">
              <span className="font-medium">List user is empty</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <div className="dialog-delete">
        <DialogDelete
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete }
        />
    </div>
    </>
  );
};

export default UserTable;
