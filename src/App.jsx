import Header from "./components/Header"
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
