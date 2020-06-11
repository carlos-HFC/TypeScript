import React from 'react'

interface Props {
   user: {
      name: string
      email: string
   }
}

const User: React.FC<Props> = ({ user }) => {
   return (
      <div>
         <strong>Nome: </strong> {user.name} <br />
         <strong>E-mail: </strong> {user.email} <br /><br />
      </div>
   )
}

export default User
