import React, { useState, useEffect } from "react";
import axios from "axios";
import PostFeed from "./PostFeed";

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
      <PostFeed />
    </div>
  );
}

export default Dashboard;
