import React, { useEffect } from "react";
import SingleTodo from "@/Components/SingleTodo";
import { useRouter } from "next/router";
import useTodoContext from "@/hooks/useTodoContext";

const SingleTodoPage = () => {
  const router = useRouter();
  const { findByIdHandler, singleTodo: singleTask } = useTodoContext();
  const { todoId } = router.query;
  console.log(singleTask);
  //wrapping the findByIdHandler in useEffect to avoid the error
  useEffect(() => {
    findByIdHandler("singleTodo", todoId as string);
  }, [todoId]);
  return (
    <SingleTodo
      id={singleTask.id}
      date={singleTask.date}
      start_time={singleTask.start_time}
      end_time={singleTask.end_time}
      title={singleTask.title}
    />
  );
};

export default SingleTodoPage;
