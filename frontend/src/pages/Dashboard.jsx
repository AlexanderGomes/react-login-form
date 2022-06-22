import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import React from 'react'

const Dashboard = () => {
const navigate = useNavigate()

const {user} = useSelector((state) => state.auth)

useEffect(() => {
if(!user) {
  navigate('/login')
}
}, [user, navigate])

  return (
    <div>
      <h1>{user && user.name}</h1>
    </div>
  )
}

export default Dashboard