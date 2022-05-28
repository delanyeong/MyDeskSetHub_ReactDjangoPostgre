import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";





function PostFeedCard() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      async function fetchPosts() {
        const { data } = await axios.get("/api/posts/");
        setPosts(data);
      }
    
      fetchPosts();
    }, []);
    
  return (
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {posts.map((posts) => (
        <div
        key={posts.title}
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
                    by {posts.username}
                  </dt>
                </div>
                <dd>
                  <div className="text-sm text-gray-900">{posts.desc}</div>
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
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default PostFeedCard