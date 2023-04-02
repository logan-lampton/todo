import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../store/slices/TodoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
// maybe need an empty.jpg

function ToDoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              placeholder={
                currentTodo ? "Update your task here." : "Enter your task here"
              }
            />
          </div>
        </div>
      )}
      <button
        className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
        onClick={handleClick}
      >
        Add task
      </button>
    </div>
  );
}

export default ToDoList;
