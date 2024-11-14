import { UserList } from "@/component/handleUsersList/usersList/usersList";
import ButtonBase from "@/component/atoms/button/button";

export function HomePage() {

  return (
    <div className="home-container ">
      <h1 className="text-center text-4xl font-bold py-4">
        List user
      </h1>
     
      <div className="flex justify-center">
          <div>
            <UserList/>
          </div>
      </div>
      {/* <div className="pagination-page flex justify-center py-8">
          <PaginationPage />
      </div> */}
    </div>
  );
}
