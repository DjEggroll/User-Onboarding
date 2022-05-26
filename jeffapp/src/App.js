import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Person from './Person';

const initialUsers = [];

function App() {

  const [users, setUsers] = useState(initialUsers);

  const addNewUser = (newUser) => {
    return axios.post("https://reqres.in/api/users", newUser)
    .then(res => {
        setUsers([...users, res.data])
    })
  }

  return (
    <div className="App">
     
      <Form addNewUser={addNewUser}/>

      {users.map(user => <Person key={user.id} user={user}/>)}

    </div>
  );
}

export default App;
