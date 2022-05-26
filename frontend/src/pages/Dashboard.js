import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import DashNav from '../components/DashNav'


function Dashboard() {

  const [ posts, setPosts ] = useState([])

  useEffect(() => {

    async function fetchPosts () {
          const { data } = await axios.get('/api/posts/')
          setPosts(data)
    }

    fetchPosts()

  }, [])

  return (
    <div>
        <DashNav />
        <Sidebar />  
         
    </div>
  )
}

export default Dashboard