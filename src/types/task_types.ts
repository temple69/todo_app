// Declaring types for the task component
export type TaskDetails = {
  task_description: string;
  task_date: string;
  start_time: string;
  end_time: string;
};
//Decalring types for the todo component
export type singleTodoType = {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  completed?:boolean | undefined;
};
//Declaring types for the todoContext
export interface todoContextType{
  todos: singleTodoType[];
  singleTodo: singleTodoType;
  editedTodo:singleTodoType;
  findByIdHandler: (mode: string, id: string) => singleTodoType;
  addToTaskListHandler: (task: singleTodoType,id:string) => void;
  modalState:boolean;
  openModalHandler: () => void;
  closeModalHandler: () => void;
  filterByDateHandler: (date: string) => void;
  filteredTodosDate: singleTodoType[];
  
};
//Declaring types for the pagination component
  export type PaginationType={
    pageCount:number
    handlePageClick:(page: {selected: number;})=>void,
}