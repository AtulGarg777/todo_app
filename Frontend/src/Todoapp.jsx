import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { createTodo, intializeTodo, removeTodo, updateTodo } from "./redux/store/slices/TodosSlice";


function Todoapp({ username }) {

  let [inpValue, setInpVal] = useState("");
  let todos = useSelector((state) => state.todos.value)
  let [editInd, setEditInd] = useState(null);
  let dispatch = useDispatch();


  async function addTodo() {
    if (inpValue.trim() == "") {
      // alert("Todo Cannot be Empty") 
      return
    }

    if (editInd != null) {
      await fetch(`http://localhost:8000/user/${username}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ editInd, inpValue })
      }).then((res) => {
        return res.json()
      }).then((res) => { console.log(res) })
        .catch((err) => {
          console.log("error in editing todo ", err);
        })

      dispatch(updateTodo({ editInd, inpValue }))
      setInpVal("")
      setEditInd(null)
      return
    }

    await fetch(`http://localhost:8000/todos/addtodo`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inpValue, username })
    }).then((res) => {
      return res.json()
    }
    ).then((res) => {
      console.log(res);

    }).catch(err => {
      console.log(err);

    })

    dispatch(createTodo(inpValue.trim()))
    // setTodos([...todos, inpValue.trim()])
    setInpVal("")
  }

  async function delTodo(ind) {
    await fetch('http://localhost:8000/user', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: todos[ind], username })
    }).then((res) => {

      return res.json()
    }).then((res) => console.log(res))
      .catch((err) => console.log(err)
      )
    dispatch(removeTodo(ind))
    // setTodos((todos) => todos.filter(((todos, i) => i != ind)))
  }

  function editTodo(val, ind) {
    setInpVal(val)
    setEditInd(ind)
  }

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setInpVal(e.target.value)} value={inpValue} placeholder="Enter Todo Here..." />
        <button onClick={() => addTodo()}>Add Todo</button>
      </div>
      <div>
        <ul style={{ color: 'white' }}>
          {todos && todos.map((val, ind, arr) => {
            return (
              <div key={ind}>
                <li>{val}</li>
                <button onClick={() => delTodo(ind)}>del</button>
                <button type="button" onClick={() => editTodo(val, ind)}>Edit</button>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Todoapp
