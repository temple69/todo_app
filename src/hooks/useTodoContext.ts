import { TodoContext } from '@/store/todo_context'
import React, { useContext } from 'react'

//Custom hook to use the context
const useTodoContext = () => {
    const task_context= useContext(TodoContext)
  return task_context
}
//export the hook
export default useTodoContext
