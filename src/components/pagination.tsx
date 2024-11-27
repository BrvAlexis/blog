import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8">
      <Link href="#" onClick={() => onPageChange(currentPage - 1)} className={`px-4 py-2 ${currentPage === 1 ? 'hidden' : ''}`}>
        Précédent
      </Link>
      <span className="px-4 py-2">Page {currentPage} sur {totalPages}</span>
      <Link href="#" onClick={() => onPageChange(currentPage + 1)} className={`px-4 py-2 ${currentPage === totalPages ? 'hidden' : ''}`}>
        Suivant
      </Link>
    </div>
  );
}; 