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

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todolist"));
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
      dispatch(addTodo({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(false);
    }
  };

  const handleUpdateTodoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        updateTodo({
          task: task,
          id: id,
        })
      );
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    dispatch(setTodoList(updatedTodoList));
    localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const sortTodoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              className="border p-2 rounded-md outline-none mb-8"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your task here" : "Enter your task here"
              }
            />
            <div className="flex justify-between">
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      handleClick;
                      handleUpdateTodoList(currentTodo.id, newTask);
                    }}
                    className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={handleClick}
                  >
                    Cancel
                  </button>
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
                    className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                    onClick={() => {
                      handleAddTodo(newTask);
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
      <div>
        {todoList.length === 0 ? (
          <div>
            <p>✅ You completed all of the tasks! Feel free to add more</p>
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            <div>
              <select onChange={e => handleSort(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
            {sortTodoList.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4 text-white"
              >
                <div 
                className={`${todo.completed ? "line-through text-greenTeal" : "text-white"}`}
                onClick={() => handleToggleCompleted(todo.id)}>
                  {todo.task}
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white p-1 rounded-md ml-2"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentTodo(todo);
                      setNewTask(todo.task);
                    }}
                  >
                    <TiPencil />
                  </button>
                  <button
                    className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TodoList;
