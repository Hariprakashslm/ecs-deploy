import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from './UserForm'
function Users(){
  const [usersData,setUsersData] = useState([])
  useEffect(()=>{
    fetch("http://localhost:3000/users").then(response=>response.json()).then(setUsersData)
  },[])
  return <>
{
  usersData.map(user=><p>user name:{user.name} , user email: {user.email}</p>)
}
  
  </>
}

 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserForm />
      <Users></Users>
    </>
  )
}

export default App
