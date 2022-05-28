import React, { useContext, useState, useEffect } from 'react'
import controlImg from '../assets/control.png'
import logoImg from '../assets/logo.png'
import chartfillImg from '../assets/Chart_fill.png'
import chatImg from '../assets/Chat.png'
import userImg from '../assets/User.png'
import calendarImg from '../assets/Calendar.png'
import searchImg from '../assets/Search.png'
import chartImg from '../assets/Chart.png'
import folderImg from '../assets/Folder.png'
import settingImg from '../assets/Setting.png'
// import DashNav from './DashNav'
import Carousel from './Carousel';
import StateContext from '../Context/StateContext'
import axios from 'axios'


function Sidebar() {

  const globalState = useContext(StateContext)

  const Menus = [
    { title: "Dashboard", src: chartfillImg },
    { title: "Inbox", src: chatImg },
    { title: "Accounts", src: userImg, gap: true },
    { title: "Schedule ", src: calendarImg },
    { title: "Search", src: searchImg },
    { title: "Analytics", src: chartImg },
    { title: "Files ", src: folderImg, gap: true },
    { title: "Setting", src: settingImg },
  ];

    const [open, setOpen] = useState(true);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      async function fetchPosts() {
        const { data } = await axios.get("/api/posts/");
        setPosts(data);
      }
  
      fetchPosts();
    }, []);


  return (
    <div className="flex"> 

      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-indigo-600 h-screen p-5  pt-8 relative duration-300`}
      >
            <img
            src={controlImg}
            alt="/"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-indigo-600
            border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            />

            <div className="flex gap-x-4 items-center">
                <img
                    src={logoImg}
                    alt="/"
                    className={`cursor-pointer duration-500 ${
                    open && "rotate-[360deg]"
                    }`}
                />
                <h1
                    className={`text-white origin-left font-medium text-xl duration-200 ${
                    !open && "scale-0"
                    }`}
                >
                    {`${globalState.userIsLogged}` ? `${globalState.userUsername}` : "User 404"}
                </h1>
            </div>

            <ul className="pt-6">
            {Menus.map((Menu, index) => (
                <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                } `}
                >
                <img src={Menu.src} alt="/" />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                </span>
                </li>
            ))}
            </ul>

      </div>

      {/* <div className="h-screen flex-1 p-7">
        <div className="text-2xl font-semibold"><DashNav /></div>
        Category1
        <Carousel />
        Category2
        <Carousel /> */}

        {posts.map((posts) => (
          <body class="h-screen bg-gray-100">
            <div className="md:h-full flex items-center text-gray-600">
              <div class="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                  <div className="p-4 sm:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img className="lg:h-72 md:h-48 w-full object-cover object-center"
                        src={posts.image} alt="blog" />
                          <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                              <h2 className="text-base font-medium text-indigo-300 mb-1">October 29,
                                2021</h2>
                              <h1 className="text-2xl font-semibold mb-3">Cities are crowded</h1>
                              <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit
                                fuga! Dolores quisquam eius cum accusamus?</p>
                                  <div className="flex items-center flex-wrap ">
                                    <a className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">Read More
                                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                    <span
                                      className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                      <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                      </svg>1.2K
                                    </span>
                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                      <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path
                                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                        </path>
                                      </svg>6
                                    </span>
                                  </div>
                          </div>
                    </div>
                  </div>
              
                </div>
              </div>
            </div>
          </body>
        ))}
    </div>
  )
}

export default Sidebar