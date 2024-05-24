import { DoubleChevronLeft, DoubleChevronRight } from "@icons/MyTVIcons"
// import { useState } from "react"

// const Pagination = ({ totalPages, page, onPageChange }: { totalPages: number, page: number, onPageChange: any }) => {
//     const [currentPage, setCurrentPage] = useState<number>(page)
//     const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber)
//         onPageChange(pageNumber)
//     }

//     const goNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1)
//             onPageChange(currentPage + 1)
//         }
//     }

//     const goPreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1)
//             onPageChange(currentPage - 1)
//         }
//     }
//     return (
//         <div className="">
//             <div className="flex w-fit divide-x divide-white/10">
//                 <button onClick={goPreviousPage} className={`h-9 w-9 border border-r-0 border-white/10 flex items-center justify-center bg-dark-700 ${currentPage === 1 ? 'cursor-default' : 'hover:bg-primary-900'} transition-colors duration-300 rounded-l`}>
//                     <span className="text-grey-200 font-bold text-sm">
//                         <DoubleChevronLeft classes="text-white h-4" />
//                     </span>
//                 </button>
//                 {pages.map((pageNumber) => (
//                     <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={`border-t border-b border-white/10 h-9 w-9 flex items-center justify-center ${currentPage === pageNumber ? 'bg-primary-900' : 'bg-dark-700'} hover:bg-primary-900 transition-colors duration-300`}>
//                         <span className="text-grey-200 font-bold text-sm">{pageNumber}</span>
//                     </button>
//                 ))}
//                 <button onClick={goNextPage} className={`border border-l-0 border-white/10 h-9 w-9 flex items-center justify-center bg-dark-700 ${currentPage === totalPages ? 'cursor-default' : 'hover:bg-primary-900'} transition-colors duration-300 rounded-r`}>
//                     <span className="text-grey-200 font-bold text-sm">
//                         <DoubleChevronRight classes="text-white h-4" />
//                     </span>
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Pagination


const Pagination = ({ currentPage, setCurrentPage, totalPages }: any) => {
    const pagination = Array.from({ length: totalPages }, (_, index) => index); // Indexation commence à 0
  
    const isPrevDisabled = currentPage === 0;
    const isNextDisabled = currentPage === totalPages - 1;
  
    const renderEllipses = () => (
      <button className={`border-t border-b border-white/10 h-9 w-9 flex items-center justify-center bg-dark-700 transition-colors duration-300`}>
          <span className="text-grey-200 font-bold text-sm">...</span>
      </button>
    );
  
    return (
      <div className="flex w-fit divide-x divide-white/10">
        <button 
          disabled={isPrevDisabled}
          onClick={() => setCurrentPage((prev: any) => Math.max(0, prev - 1))}
          className={`h-9 w-9 border border-r-0 border-white/10 flex items-center justify-center bg-dark-700 ${isPrevDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary-900'} transition-colors duration-300 rounded-l`}
        >
          <span className="text-grey-200 font-bold text-sm">
              <DoubleChevronLeft classes="text-white h-4" />
          </span>
        </button>

        {
            pagination.length <= 4 && (
                pagination.map((page) => (
                    <button
                        key={page}
                        className={(currentPage === page ? 'bg-primary-900' : 'bg-dark-700') + ` w-9 h-9 text-sm border-t border-b border-white/10 text-white flex items-center justify-center`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page + 1}
                    </button>
                ))
            )
        }
  
        {pagination.length > 4 && (
          <>
            {currentPage <= 1 ? (
              pagination.slice(0, 3).map((page) => (
                <button
                  key={page}
                  className={(currentPage === page ? 'bg-primary-900' : 'bg-dark-700') + ` w-9 h-9 text-sm border-t border-b border-white/10 text-white flex items-center justify-center`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              ))
            ) : (
              <>
                {renderEllipses()}
                <button
                  key={currentPage - 1}
                  className={(currentPage - 1 === currentPage ? 'bg-primary-900' : 'bg-dark-700') + ` w-9 h-9 text-sm border-t border-b border-white/10 text-white flex items-center justify-center`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {currentPage}
                </button>
                <button
                  key={currentPage}
                  className="bg-primary-900 w-9 h-9 text-sm border-t border-b border-white/10 text-white flex items-center justify-center"
                  onClick={() => setCurrentPage(currentPage)}
                >
                  {currentPage + 1}
                </button>
                {
                  currentPage < totalPages - 1 && (
                    <button
                        key={currentPage + 1}
                        className={(currentPage + 1 === currentPage ? 'bg-primary-900' : 'bg-dark-700') + ` w-9 h-9 text-sm border-t border-b border-white/10 text-white flex items-center justify-center`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        {currentPage + 2}
                    </button>
                  )
                }
                {currentPage < totalPages - 2 && renderEllipses()}
              </>
            )}

            <button 
              disabled={isNextDisabled}
              onClick={() => setCurrentPage((prev: any) => Math.min(totalPages - 1, prev + 1))}
              className={`border border-l-0 border-white/10 h-9 w-9 flex items-center justify-center bg-dark-700 ${isNextDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary-900'} transition-colors duration-300 rounded-r`}
            >
                <span className="text-grey-200 font-bold text-sm">
                    <DoubleChevronRight classes="text-white h-4" />
                </span>
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default Pagination;
  