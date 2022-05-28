import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import DashNav from "../components/DashNav";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get("/api/posts/");
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <DashNav />
      <Sidebar />

      {posts.map((posts) => (
        <div sm={12} md={6} lg={4} xl={3}>
          <div class="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={posts.image}
                alt=""
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{posts.name}</h2>
              <p>{posts.description}</p>
              <p>Brand: {posts.brand}</p>
              <p>Category: {posts.category}</p>
              <p>{posts.link}</p>
              <p>{posts.price}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
