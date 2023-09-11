import React from "react";
import ReactPaginate from "react-paginate";
import { PaginationType } from "@/types/task_types";
import {GrLinkNext} from "react-icons/gr"
import {GrLinkPrevious} from "react-icons/gr"
const Pagination = ({pageCount,handlePageClick}:PaginationType) => {
    return (
      <div>
        <ReactPaginate
          previousLabel={
            <article className="text-[#475467] text-sm font-semibold flex w-[100px] gap-2">
              <GrLinkPrevious size={20} />
              <p className="showOnTablet">Previous</p>
            </article>
          }
          nextLabel={
            <article className="text-[#475467] text-sm font-semibold flex w-[100px]  gap-2">
              <p className="showOnTablet">Next</p>
              <GrLinkNext size={20} />
            </article>
          }
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={pageCount}
          breakLabel={"..."}
          breakClassName="break-me"
          previousClassName={"previous"}
          nextClassName="next"
    
        />
      </div>
    );
}
export default Pagination