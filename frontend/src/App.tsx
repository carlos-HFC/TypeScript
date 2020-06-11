import React, { useEffect, useState } from 'react';
import api from './services/api'
import User from './components/User'

interface IUser {
   name: string
   email: string
}

function App() {
   const [users, setUsers] = useState<IUser[]>([])

   useEffect(() => {
      api.get('/user')
         .then(response => setUsers(response.data))
   }, [])

   return (
      <div className="app">
         {users.map(user => <User key={user.email} user={user} />)}
      </div>
   )
}

export default App;
