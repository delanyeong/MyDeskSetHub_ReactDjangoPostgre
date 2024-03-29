import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { HeartIcon, BookmarkIcon, XIcon } from "@heroicons/react/outline";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import StateContext from "../Context/StateContext";



function Dashboard() {

  const navigate = useNavigate();
  const { id } = useParams();

  const globalState = useContext(StateContext)

  // const params = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get("/api/posts/");
      setPosts(data);
    }

    fetchPosts();
  }, []);


  const deleteHandler = (id) => {
    console.log(id)
    deleteActual(id)
    navigate(0)

  }

  async function deleteActual (id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?") 
    if (confirmDelete)
    try {
      
      const response = await axios.delete(`http://localhost:8000/api/posts/${id}/delete/`)
      console.log(response)
      Navigate("/dashboard")
    } catch(e){
      console.log(e.response)
    }
  }

  





  return (
    <div>
      <div class="my-8">
        <div class="container mx-auto px-6">
            <div class="h-80 rounded-md overflow-hidden bg-cover bg-center bg-setup-image2" >
                <div class=" bg-opacity-50 flex items-center h-full">
                    <div class="px-10 max-w-xl">
                        <h2 class="text-2xl text-white font-semibold">My Desk Set Up</h2>
                        <p class="mt-2 text-gray-400">Show Off Your Set Up.</p>
                        <button class="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>See More</span>
                            <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
      

            <div class="mt-16">
                <h3 class="text-white text-2xl font-medium">Peripherals</h3>
                
                    
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {posts.map((posts, i) => (
        <div
        key={i}
        className="bg-white overflow-hidden shadow rounded-lg"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="w-0 flex-1">
              <dl>
                <dt>
                  <div>
                    <img
                      src={posts.image}
                      className="object-cover w-full h-48"
                      alt=""
                    />
                  </div>
                </dt>
                <div className="mt-4 flex justify-between md:mt-2">
                  <dt className="text-lg font-medium text-gray-500 truncate">
                    {posts.title}
                  </dt>
                  <dt className="text-xs font-light border border-gray-200 p-1 rounded-lg text-gray-500 truncate">
                    by @{posts.user_username}
                  </dt>
                </div>
                <dd>
                <h1 class="font-bold text-center">{posts.name}</h1>
                
                  <p class="text-sm text-center line-clamp-2 my-2">
                  <div className="text-sm text-gray-900">{posts.description}</div>
                  <div className="text-sm text-gray-900">Brand: {posts.brand}</div>
                  <div className="text-sm text-gray-900">Category: {posts.category}</div>
                  <div className="text-sm text-gray-900">Link: {posts.link}</div>
                  </p>
                  <p class="font-bold text-lg text-center my-2">$ {posts.price}<sup>SGD</sup></p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-gray-50 px-5 py-3">
          <div className="text-sm">
              <Link
                to={`/posts/${posts.id}`}
                className="font-medium text-teal-700 hover:text-teal-900"
              >
                View detail
              </Link>
          </div>

          <div className="flex space-x-2">
            <button type="button">
              <HeartIcon
                className="h-6 w-6 text-gray-400 "
                aria-hidden="true"
                onClick={() => {
                //   dispatch(likeposts(id));
                }}
              />
            </button>

            <div className="w-px h-6 bg-gray-400" />
            <button type="button">
              <BookmarkIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
                onClick={() => {
                //   dispatch(saveposts(posts.author, id));
                }}
              />
            </button>

            <div className="w-px h-6 bg-gray-400" />
            <button type="button">
                  <XIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                    onClick={() => deleteHandler(posts.id)}
                  />
                </button>
          </div>
        </div>
      </div>
      ))}
    </div>
                    
                
            </div>
        
      
          
        
      
    
          
    </div>
    </div>
    </div>
  );
}

export default Dashboard;
