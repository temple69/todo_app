import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from "react";
import { todoContextType } from "@/types/task_types";
import { singleTodoType } from "@/types/task_types";
import useRouting from "@/hooks/useRouting";
import {
  convertISODateToYYYYMMDD,
  getCurrentDate,
} from "@/utils/helperFunctions";

interface ParentComponentProps {
  children: ReactNode;
}
//Initial todo object
const initialTodo = {
  id: "",
  date: "",
  start_time: "",
  end_time: "",
  title: "",
  completed: false,
};
//Initial todo list
const to_dos: singleTodoType[] = [];
//Creating the context
export const TodoContext = createContext<todoContextType>({
  todos: [],
  singleTodo: initialTodo,
  editedTodo: initialTodo,
  findByIdHandler: (mode: string, id: string | number) => initialTodo,
  addToTaskListHandler: (todoData: singleTodoType, id: string) => {},
  modalState: false,
  openModalHandler: () => {},
  closeModalHandler: () => {},
  filterByDateHandler: (date: string) => {},
  filteredTodosDate: [],
});

//Creating the context provider
const TodoContexProvider = ({ children }: ParentComponentProps) => {
  const [taskStore, setTaskStore] = useState({
    todos: to_dos,
    singleTodo: initialTodo,
    editedTodo: initialTodo,
    modalState: false,
    filteredTodosDate: to_dos,
  });
  //Destructuring the taskStore
  const { todos, singleTodo, editedTodo, modalState, filteredTodosDate } =
    taskStore;
  //Function to add a new task to the list
  //Function to open the modal
  const openModalHandler = () => {
    setTaskStore({ ...taskStore, modalState: true });
  };
  //Function to close the modal
  const router = useRouting();
  const closeModalHandler = () => {
    setTaskStore({ ...taskStore, modalState: false });
    router.push("/");
  };
  //Function to fetch all the todos from the API
  const getAllTodos = useCallback(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos ");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      const modifed_todos = data.map((item: any) => {
        const updated: singleTodoType = {
          id: item.id.toString(),
          completed: item.completed,
          title: item.title,
          start_time: "10:00",
          end_time: "11:00",
          date: getCurrentDate(),
        };
        return updated;
      });
      setTaskStore({ ...taskStore, todos: modifed_todos });
    } catch (error) {}
  }, []);
  //Fetching the todos from the API
  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);
  const addToTaskListHandler = (todoData: singleTodoType, id: string) => {
    //Check if the id is present
    if (id) {
      // Find the index of the item to update
      const findEditedIdIndex = todos.findIndex((todo) => todo.id === id);
      if (findEditedIdIndex !== -1) {
        // Create a copy of the edited item with the updated data
        const editedData = {
          ...todos[findEditedIdIndex],
          ...todoData,
        };
        // Create a copy of the todos array with the updated item
        const updatedTodos = [...todos];
        updatedTodos[findEditedIdIndex] = editedData;
        setTaskStore({ ...taskStore, todos: updatedTodos });
      }
      //If the task does not exist, throw an error
      else {
        alert("Task does not exist");
      }
    }
    //If the id is not present, add a new task
    else {
      setTaskStore(({ todos }) => {
        //Check if the task already exists
        const isTaskAlreadyExists = todos.some(
          (todo) => todo.title === todoData.title
        );
        //If the task already exists, throw an error
        if (isTaskAlreadyExists) {
          alert("Task already exists");
          return { ...taskStore };
        }
        //If the task does not exist, add it to the list
        return {
          ...taskStore,
          todos: [todoData, ...todos],
        };
      });
    }
  };
  //Function to find a task by id
  const findByIdHandler = (mode: string, id: string) => {
    //Check if the mode is singleTodo
    const taskExists = todos.find((todo) => todo.id === id);
    //If the task exists, set the taskStore
    if (taskExists) {
      setTaskStore({ ...taskStore, [mode]: taskExists });
    }
    //If the task does not exist, set the taskStore to initialTodo
    else {
      setTaskStore({ ...taskStore, [mode]: [] });
    }
    //Return the task
    return taskExists as singleTodoType;
  };
  //Function to filter the todos by date
  const filterByDateHandler = (date: string) => {
    const formattedDate: string = convertISODateToYYYYMMDD(date);
    const updatedTodos = [...todos];
    const filteredTodos = updatedTodos.filter((todo) => {
      // Compare todo.date with formattedDate
      return todo.date === formattedDate.toString();
    });
    // Set the filteredTodos to the state
    setTaskStore({ ...taskStore, filteredTodosDate: filteredTodos });
  };
  //Creating the context value
  const contextValue = {
    todos,
    singleTodo,
    editedTodo,
    modalState,
    findByIdHandler,
    addToTaskListHandler,
    openModalHandler,
    closeModalHandler,
    filterByDateHandler,
    filteredTodosDate,
  };

  return (
    //Providing the context value to the children
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
//Exporting the context provider
export default TodoContexProvider;
