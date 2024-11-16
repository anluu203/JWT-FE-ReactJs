// UserList.tsx
import { useEffect, useState } from "react";
import { handleFetchUsers } from "@/services/userService";
import UserTable from "../usersTable/usersTable";
import PaginationComponent from "../pagination/pagination";

export interface Position{
  id?: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  sex: string;
  phone: string;
  email: string;
  address:string;
  position?: Position;
}

export const UserList: React.FC = () => {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentResults, setCurrentResults] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    var response = await handleFetchUsers(currentPage, currentResults);
    if (response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, currentResults]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative">
      <UserTable listUsers={listUsers} fetchUsers={fetchUsers} currentPage={currentPage} currentResults={currentResults} />
      {totalPages > 0 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};

