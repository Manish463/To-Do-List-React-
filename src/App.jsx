import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'

// Main App component
function App() {
  // State for the current input value
  const [todo, setTodo] = useState("")
  // State for the list of todos
  const [todos, setTodos] = useState([])
  // State to toggle showing finished tasks
  const [showFinished, setShowFinished] = useState(true)
  const [firstTime, setFirstTime] = useState(true);
  
  // Load todos from localStorage on component mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    setFirstTime(false)
  }, [])
  
  useEffect(() => {
    if (!firstTime) {
      saveToLS()
    }
  }, [todos])

  // Toggle the visibility of finished tasks
  const toggleShowFinished = () => {
    setShowFinished(!showFinished)
  }

  // Save current todos to localStorage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  // Handle input change for the todo field
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // Add a new todo to the list
  const handleAdd = () => {
    console.log("Adding todo:", todo)
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    // saving the todos on localStorage is done in useEffect
  }

  // Edit an existing todo
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id != id
    })
    setTodos(newTodos)
  }

  // Delete a todo from the list
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id != id
    })
    setTodos(newTodos)
  }

  // Toggle the completion status of a todo
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }

  // Render the component UI
  return (
    <>
      {/* Navbar component */}
      <Navbar/>
      <div className="md:container md:mx-auto select-auto mx-3 my-3 md:my-5 rounded-xl bg-violet-100 p-5 md:p-8 min-h-[80vh] md:w-[35%]">
        {/* App title */}
        <h1 className='flex justify-center text-xl md:text-2xl font-bold'>iTask - Manage your task at one place</h1>
        {/* Section to add a new todo */}
        <div className="addTodo flex flex-col gap-2 my-5 md:my-7">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
            {/* Input for new todo */}
            <input onChange={handleChange} onKeyDown={(e) => {if (e.code == "Enter" ) {(todo.length > 3) ? handleAdd() : alert("Minimum 4 letters required.")}}} value={todo} type="text" className='inp w-full bg-white rounded-full px-5 py-1' placeholder='Write your todo here......'/>
            {/* Add button, disabled if input is too short */}
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-900 disabled:bg-violet-500 px-3 py-1 text-sm font-bold rounded-full mx-2 md:mx-5 text-white'>Add</button>
          </div>
        </div>
        {/* Toggle to show/hide finished tasks */}
        <div className='flex align-middle'>
          <span className='w-[25px] h-[25px] self-center'><input type="checkbox" id="show" onChange={toggleShowFinished} checked={showFinished} className='self-center' /></span>
          <label className='mx-2' htmlFor="show">Show Finished</label>
        </div>
        
        {/* Divider */}
        <div className='h-[1px] w-[90%] bg-black opacity-50 m-auto my-2 mb-5'></div>
        {/* Todos list section */}
        <div className="todos my-3">
          <h2 className='text-lg font-bold'>Your Task</h2>
          {/* Message if no todos exist */}
          {todos.length === 0 && <div className='m-5'>No Todo to display</div>}
          {/* Render each todo item */}
          {todos.map(item=>{
            // Only show unfinished tasks if showFinished is false

            return ((showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between gap-2 bg-violet-200 p-3 rounded-md">
              <div className='flex gap-3 w-[80%]'>
                {/* Checkbox to mark as completed */}
                <span className='w-[25px] h-[25px] self-center'><input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} className='self-center'/></span>
                {/* Todo text, strikethrough if completed */}
                <div className={item.isCompleted?"line-through opacity-60":""}>{item.todo}</div>
              </div>
              {/* Edit and Delete buttons */}
              <div className="button flex h-full self-center">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><MdEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><MdDelete /></button>
              </div>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
