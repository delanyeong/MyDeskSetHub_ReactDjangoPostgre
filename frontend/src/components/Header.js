import React, { useContext } from "react";
import Axios from "axios";
import StateContext from "../Context/StateContext";
import DispatchContext from "../Context/DispatchContext";
import { useNavigate } from 'react-router-dom'


function Header() {
  const navigate = useNavigate()

  const globalState = useContext(StateContext)
  const globalDispatch =useContext(DispatchContext)

  function handleProfile() {
    navigate('/profile')
  }

  async function handleLogout () {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      try {
        const response = await Axios.post("http://localhost:8000/api-auth-djoser/token/logout/", 
        globalState.userToken, 
        {headers: {Authorization : 'Token '.concat(globalState.userToken)}}
        );
        console.log(response)
        globalDispatch({type: 'logout'})
        navigate('/')
      } catch (e) {
        console.log(e.response)
      }
    }
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="btn btn-ghost normal-case text-xl">Welcome to MyDeskSetHub!</div>
        </div>
        <div className="flex-none gap-2">
          <button class="btn btn-sm btn-primary" onClick={()=> navigate("/addpost")}>Add Post</button>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div>Welcome, {`${globalState.userIsLogged}` ? `${globalState.userUsername}` : "User 404"}
</div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" alt="" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="justify-between" onClick={handleProfile}>
                  Profile
                  <span className="badge">New</span>
                </div>
              </li>
              <li>
                <div>Settings</div>
              </li>
              <li>
                <div onClick={handleLogout}>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
