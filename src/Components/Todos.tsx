import React, { useState } from "react";
import CalendarComponent from "./Calendar";
import TodoDetails from "./TodoDetails";
import useTodoContext from "@/hooks/useTodoContext";
import { singleTodoType } from "@/types/task_types";
import Pagination from "./Pagination";

type TodosType = {
  todos: singleTodoType[];
};

const Todos = ({ todos }: TodosType) => {
  const PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(0);
  /* This function is used by the react-paginate component to know the current page number index that was clicked by user */

  const handlePageClick = (page: { selected: number }) => {
    setCurrentPage(page.selected);
  };
  //Operations to determine the number of news articles per page
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(todos.length / PER_PAGE);
  const CurrentPageData = todos.slice(offset, offset + PER_PAGE);

  return (
    <div>
      <h1 className="text-[#101828] font-semibold text-base pb-4">
        January 2023
      </h1>
      <CalendarComponent />
      <h1 className="text-[#101828] text-base font-semibold py-4">My Tasks</h1>
      {todos.length === 0 ? (
        <h1 className="font-semibold text-lg text-[#101828] text-center">
          No Tasks Added
        </h1>
      ) : (
        CurrentPageData.map((todo) => (
          <TodoDetails
            key={todo.id}
            title={todo.title}
            start_time={todo.start_time}
            end_time={todo.end_time}
            completed={todo.completed as boolean}
            id={todo.id as string}
            date={todo.date}
          />
        ))
      )}
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default Todos;
