import PaginationPage from "@/component/pagination/pagination";
import { UserList } from "@/component/usersList/usersList";


export function HomePage() {

  return (
    <div className="home-container container">
      <h1 className="text-center text-4xl font-bold py-4">
        List user
      </h1>
      <div className="container flex justify-center">
          <UserList/>
      </div>
      <div className="pagination-page container flex justify-center py-8">
          <PaginationPage />
      </div>
    </div>
  );
}
