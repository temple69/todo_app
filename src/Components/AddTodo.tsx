import React, { ChangeEvent, useCallback, useEffect, useState } from "react"; //this is the react import from the react library
import { GrClose } from "react-icons/gr"; //this is the icon for the close button
import { Inter } from "next/font/google"; //this is the font for the button
const inter = Inter({ subsets: ["latin"] }); //this is the font for the button
import { TaskDetails } from "@/types/task_types"; //this is the type for the form
import useTodoContext from "@/hooks/useTodoContext"; //this is the custom hook for the context
import { singleTodoType } from "@/types/task_types"; //this is the type for the todo object
import { v4 as uuid } from "uuid"; //this is the alternative to uuidv4
import useRouting from "@/hooks/useRouting";
//this is the function for the add todo component
const AddTodo = () => {
  const {
    findByIdHandler,
    addToTaskListHandler,
    editedTodo: edited_Todo,
    closeModalHandler,
  } = useTodoContext();
  //this is the router from the next.js team
  //used to access the router params custom hook from next.js team
  const router = useRouting();

  const { editId } = router.query;
  //State to track when the Form is in edit mode
  const [editMode, setEditMode] = useState<boolean>(false);
  //this is the state for the form
  const [task_details, setTaskDetails] = useState<TaskDetails>({
    task_description: "",
    task_date: "",
    start_time: "",
    end_time: "",
  });

  //Wrapping the findByIdHandler in useEffect to avoid the re-rendering error
  useEffect(() => {
    //checks the current route and updates the form dynamically
    if (router.pathname === "/edit_task/[editId]") {
      setEditMode(true); //this is the state for the edit mode
      const editedTodo = findByIdHandler("editedTodo", editId as string);
      //this is the function for the edit mode
      setTaskDetails({
        ...task_details,
        task_description:
          //if the editedTodo is undefined then use the edited_Todo.title else use the editedTodo.title
          editedTodo === undefined ? edited_Todo.title : editedTodo.title,
        task_date:
          editedTodo === undefined ? edited_Todo.date : editedTodo.date,
        start_time:
          editedTodo === undefined
            ? edited_Todo.start_time
            : editedTodo.start_time,
        end_time:
          editedTodo === undefined ? edited_Todo.end_time : editedTodo.end_time,
      });
    } else {
      //this is the function for the edit mode
      setEditMode(false);

      setTaskDetails({
        task_description: "",
        task_date: "",
        start_time: "",
        end_time: "",
      });
    }
  }, [editId]);
  //Destructuring Form states parameters
  const { task_description, task_date, start_time, end_time } = task_details;
  //Function which handles the form submission
  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //Check if all the fields are filled
    if (task_description && task_date && start_time && end_time) {
      const todoData: singleTodoType = {
        title: task_description,
        date: task_date,
        start_time,
        end_time,
        id: editMode ? (editId as string) : uuid(),
        completed: false,
      };
      addToTaskListHandler(todoData, editMode ? (editId as string) : "");
    } else {
      alert("Please fill all the fields");
    }
    //Reset the form;
    setTaskDetails((prevState) => {
      return {
        ...prevState,
        task_description: "",
        task_date: "",
        start_time: "",
        end_time: "",
      };
    });
  };
  //Function which handles the change event on inputs
  const handleChange =
    (feildName: keyof TaskDetails) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      //Update the state
      setTaskDetails({ ...task_details, [feildName]: event.target.value });
    };
  return (
    <div
      className={`rounded-lg bg-white border border-solid border-[#D0D5DD] custom_shadow px-[1.5rem]  min-w-fit width_100 ${
        editId ? "height_vh" : "h-fit"
      }`}
    >
      <article className=" flex justify-between my-4">
        <h2 className="text-[#101828] font-semibold text-lg">
          {editMode ? "Edit Task" : "Add Task"}
        </h2>

        <button onClick={() => closeModalHandler()}>
          <GrClose />
        </button>
      </article>

      <form onSubmit={addTodoHandler}>
        <textarea
          name="task_description"
          cols={30}
          className="py-3 px-3 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-lg h-[8.75rem] resize-none text-black w-full shadow_custom"
          value={task_description}
          onChange={handleChange("task_description")}
        ></textarea>
        <fieldset className="text-[#667085] flex justify-between  my-2 bg-white gap-2">
          <input
            type="date"
            name="task_date"
            defaultValue="today"
            className="border border-[#D0D5DD] rounded-lg  p-1  border-solid shadow_custom"
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
        <fieldset className="flex  justify-between items-center my-2">
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
          <button
            className={`bg-white py-2 px-4 rounded-lg text-[#344054] border border-solid border-[#D0D5DD] custom_shadow  w-full text-base ${inter.className}`}
          >
            Cancel
          </button>
          <button className="bg-[#3F5BF6] text-white py-2 px-4 rounded-lg custom_shadow  w-full border border-solid border-[#3F5BF6] text-sm ">
            {editMode ? "Save" : "Add"}{" "}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddTodo;
