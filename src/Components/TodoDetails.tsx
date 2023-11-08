import { convertTo12HourFormat } from "@/utils/helperFunctions";

import React, { useState } from "react";
import useRouting from "@/hooks/useRouting"; //this is the custom hook for the routing
import useTodoContext from "@/hooks/useTodoContext";

//this is the type for the todo object
type todoType = {
  title: string;
  start_time: string;
  end_time: string;
  completed: boolean;
  id: string;
  date: string;
};
//this is the function for the todo details component
const TodoDetails = ({
  title,
  start_time,
  end_time,
  id,
  completed,
  date,
}: todoType) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const router = useRouting();
  const { openModalHandler } = useTodoContext();
  //this is the function for the single page handler
  const singlePageHandler = (id: string) => {
    router.push(`/single_todo/${id}`);
    openModalHandler();
  };
  return (
    <div
      className={`flex py-1 decrease_padding gap-4 items-center justify-between  h-[4.5rem]  border-[#eaecf0] border-b-[1px] border-solid bg-[#f9fafb] my-2`}
      key={id}
    >
      <aside className="flex gap-4">
        <input
          type="checkbox"
          name="completed_todo"
          onClick={() => setIsCompleted(!isCompleted)}
          checked={isCompleted ? true : false}
        />
        <article
          className="gap-1 cursor-pointer line-through] text-[red]"
          onClick={() => singlePageHandler(id)}
        >
          <h2
            className={`text-[#101828] font-medium text-sm ${
              isCompleted ? "text-[#D0D5DD] line-through" : ""
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-[#475467] text-sm font-normal ${
              isCompleted ? "text-[#D0D5DD] line-through" : ""
            }`}
          >
            {convertTo12HourFormat(start_time)} -{" "}
            {convertTo12HourFormat(end_time)}
          </p>
        </article>
      </aside>
      <article>
        <p className="text-sm font-normal text-[#475467]">{date}</p>
      </article>
    </div>
  );
};
//exporting the todo details component
export default TodoDetails;
