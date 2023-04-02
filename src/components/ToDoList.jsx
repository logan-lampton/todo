import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../store/slices/TodoSlice";
import { TiPencil } from "react-icons";
import { BsTrash } from "react-icons";
// maybe need an empty.jpg

function ToDoList() {
    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todo.todoList);
    const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  return (
    <div>
      <button className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md">
        Add task
      </button>
    </div>
  );
}

export default ToDoList;
