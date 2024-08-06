export default function PaginationButtons({setFilters, paginationInfo}) {
    return (
        <div className="text-black flex justify-center items-center gap-x-2">
        <button className="p-2 rounded font-bold text-black shadow border border-[var(--purple-medium)] " onClick={() => {
          if (paginationInfo?.isFirstPage) return;
          setFilters((prev) => ({...prev, paginationCounter:(prev.paginationCounter - 1)}))
        }}>
          <img src="/left-arrow-white.svg" alt="left arrow icon" className="w-3 h-3"/>
        </button>
        {paginationInfo && 
        paginationInfo?.page} of {Math.ceil(paginationInfo?.totalRows / paginationInfo?.pageSize) || 1 
        }
        <button className="p-2 rounded font-bold text-black shadow border border-[var(--purple-medium)]"
        onClick={() => {
          if (paginationInfo?.isLastPage) return;
          setFilters((prev) => ({...prev, paginationCounter:(prev.paginationCounter + 1)}))
        }}
        >
          <img src="/right-arrow-white.svg" alt="right arrow icon" className="w-3 h-3"/>

        </button>
        
        </div>
    );
}
