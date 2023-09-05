import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
type TaskDetails = {
  task_description: string;
  task_date: string;
  start_time: string;
  end_time: string;
};

const AddTodo = () => {
  const router = useRouter();
  const [task_details, setTaskDetails] = useState<TaskDetails>({
    task_description: "",
    task_date: "",
    start_time: "",
    end_time: "",
  });
  useEffect(() => {
    if (router.pathname === "/edit_task/[editId]") {
      setTaskDetails({
        task_description: "Create wire frame",
        task_date: "2021-10-10",
        start_time: "10.30am",
        end_time: "11.30am",
      });
    } else {
      setTaskDetails({
        task_description: "",
        task_date: "",
        start_time: "",
        end_time: "",
      });
    }
  }, []);
  const { task_description, task_date, start_time, end_time } = task_details;
  const handleChange =
    (feildName: keyof TaskDetails) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTaskDetails({ ...task_details, [feildName]: event.target.value });
    };
  return (
    <div className="rounded-lg bg-white border border-solid border-[#D0D5DD] custom_shadow px-[1.5rem] py-[2.5rem] h-fit">
      <article className=" flex justify-between my-4">
        <h2 className="text-[#101828] font-semibold text-lg">Add Task</h2>

        <button>
          <GrClose />
        </button>
      </article>

      <form action="">
        <textarea
          name="task_description"
          cols={30}
          className="py-3 px-3 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-lg h-[8.75rem] resize-none text-black w-full shadow_custom"
          value={task_description}
          onChange={handleChange("task_description")}
        ></textarea>
        <fieldset className="text-[#667085] flex justify-between  my-2 bg-white">
          <input
            type="date"
            name="task_date"
            defaultValue="today"
            className="border border-[#D0D5DD] rounded-lg  p-1 border-solid shadow_custom"
            value={task_date}
            onChange={handleChange("task_date")}
          />
          <input
            type="time"
            name="start_time"
            defaultValue="00:00"
            className="border border-[#D0D5DD] rounded-lg  p-1 border-solid shadow_custom"
            value={start_time}
            onChange={handleChange("start_time")}
          />
          <input
            type="time"
            name="end_time"
            defaultValue="00:00"
            className="border border-[#D0D5DD] rounded-lg  p-1 border-solid shadow_custom"
            value={end_time}
            onChange={handleChange("end_time")}
          />
        </fieldset>
        <fieldset className="flex  justify-between items-center my-4">
          <article>
            <span className="text-[#667085] font-medium text-base">
              10 minutes before
            </span>
          </article>
          <button>
            <GrClose />
          </button>
        </fieldset>
        <fieldset className="flex justify-between font-semibold gap-4 my-8">
          <button className=" bg-white py-2 px-4 rounded-lg text-[#344054] border border-solid border-[#D0D5DD] custom_shadow  w-full">
            Cancel
          </button>
          <button className="bg-[#3F5BF6] text-white py-2 px-4 rounded-lg custom_shadow  w-full ">
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddTodo;
