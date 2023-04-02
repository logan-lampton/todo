import { useEffect, useState } from "react";
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
  const [newTask, setNewTask] = useState("");

  console.log(newTask);
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(true);
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              className="border p-2 rounded-md outline-none mb-8"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your task here." : "Enter your task here"
              }
            />
            <div className="flex justify-between">
              {currentTodo ? (
                <>
                  <button>Cancel</button>
                  <button>Save</button>
                </>
              ) : (
                <>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={handleClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                    onClick={() => {
                      handleAddTodo(newTask), handleClick;
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md mt-8"
        onClick={handleClick}
      >
        Add task
      </button>
      <div className="flex">
        {todoList.length === 0 ? (
          <>
            <div className="mt-8">
              <div>
                <p>✅ Awesome! You did all the tasks!</p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
