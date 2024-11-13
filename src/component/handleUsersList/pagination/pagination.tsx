// PaginationComponent.tsx
import { Pagination } from "@mui/material";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-page flex justify-center py-8">
      <Pagination
        count={totalPages}
        color="primary"
        page={currentPage}
        onChange={onPageChange}
      />
    </div>
  );
};

export default PaginationComponent;
