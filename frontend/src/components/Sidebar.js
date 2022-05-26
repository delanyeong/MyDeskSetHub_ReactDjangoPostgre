import React, { useContext, useState } from 'react'
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

function Sidebar() {

  const globalState = useContext(StateContext)

    const [open, setOpen] = useState(true);
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

      <div className="h-screen flex-1 p-7">
        {/* <div className="text-2xl font-semibold"><DashNav /></div> */}
        Category1
        <Carousel />
        Category2
        <Carousel />
      </div>
      
    </div>
  )
}

export default Sidebar