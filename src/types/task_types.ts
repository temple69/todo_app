export type TaskDetails = {
  task_description: string;
  task_date: string;
  start_time: string;
  end_time: string;
};
export type singleTodoType = {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  completed?:boolean
};
export interface todoContextType{
  todos: singleTodoType[];
  singleTodo: {};
  editedTodo: {};
  findByIdHandler: (mode: string, id: string) => void;
  
};