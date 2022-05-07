
import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from "./components/Todo";
import { db } from "./firebase.js";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import {
  collection, query, orderBy,
  serverTimestamp, addDoc, onSnapshot
} from "firebase/firestore";

import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');




  useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })
  }, [input]);

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'todos'), {
      todo: input,
      timestamp: serverTimestamp()
    });
    setInput('')
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <h2 style={{ color: "#30819c" }}>To-do App by Gulafsha</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="New Todo"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button variant="contained" style={{ backgroundColor: "#1e5162" }} onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map(item => <Todo key={item.id} arr={item} />)}
      </ul>
    </div>
  );
}

export default App;
