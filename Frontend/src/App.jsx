import { useState } from "react"
import Todoapp from "./Todoapp"
import './index.css'
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { createTodo, intializeTodo } from "./redux/store/slices/TodosSlice";

function App() {

  let [username, setUsername] = useState(localStorage.getItem('username') || '');
  let [btnClicked, setBtnClicked] = useState(false)
  let todos = useSelector((state) => state.todos.value)
  let dispatch = useDispatch()

  useEffect(() => {
    if (username) {
      async function td() {
        await fetch(`http://localhost:8000/user/${username}`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
          return res.json()
        }).then((res) => {
          if (res.success)
            setBtnClicked(true)
          console.log(res);

          dispatch(intializeTodo(res.user.todos))
        }
        ).catch((err) => console.log("error in fetching users todos ",err)
        )
      }
      td()
    }
  }, [])

  async function openTodo() {

    await fetch(`http://localhost:8000/user/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (res) => {
        return res.json()
      }).then(
        (res) => {
          if (res.success)
            setBtnClicked(true)

          localStorage.setItem('username', res.user?.username);
          dispatch(intializeTodo(res.user.todos))
        }
      ).catch((err) => console.log(err)
      )
  }

  return (
    <>
      <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} />
      <button type="button" disabled={btnClicked} onClick={openTodo}>Open Todo List</button>
      {btnClicked && <Todoapp username={username} />}
    </>
  )
}

export default App
